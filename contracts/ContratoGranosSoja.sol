// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC2771Context} from "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import {Context} from "@openzeppelin/contracts/utils/Context.sol";
contract ContratoGranosSoja is ERC721, Ownable, ERC2771Context {
    // ===== ENUMS =====
    enum TipoContrato { PrecioFijo, PrecioAFijar }
    enum Estado { Borrador, Enviado, Firmado, Terminado, Cancelado }
    // ===== STRUCTS =====
    struct Partes {
        address comprador;
        string nroIdentidadComprador;
        string nombreComprador;
        address vendedor;
        string nroIdentidadVendedor;
        string nombreVendedor;
        address broker;
        string nroIdentidadBroker;
        string nombreBroker;        
    }
    struct CondicionesGrano {
        uint cantidadToneladasMetricas;
        string tipoGrano;
        string cosecha;
    }
    struct CondicionesEntrega {
        string empaque;
        uint fechaEntregaInicio;
        uint fechaEntregaFin;
    }
    struct CondicionesPrecio {
        TipoContrato tipoContrato;
        uint precioPorToneladaMetrica;
        uint precioCBOTBushel;
        int ajusteCBOT;
        uint fechaPrecioChicago;
        string incoterm;
        uint precioFinal;
    }
    struct CondicionesEmbarque {
        string puertoEmbarque;
        string destinoFinal;
    }
    struct Contrato {
        Partes partes;
        CondicionesGrano condicionesGrano;
        CondicionesEntrega condicionesEntrega;
        CondicionesPrecio condicionesPrecio;
        CondicionesEmbarque condicionesEmbarque;
        string hashVersionContrato;
        string evidenceURI;
        uint fechaCelebracionContrato;
        Estado estado;
    }
    // ===== VARIABLES =====
    uint public contadorContratos;
    mapping(uint => Contrato) public contratos;
    address public relayer;
    // ===== EVENTOS =====
    event ContratoCreado(uint indexed idContrato, address indexed comprador, address vendedor);
    event ContratoFirmado(uint indexed idContrato, address vendedor, string consentHash, string evidenceURI);
    event ContratoEditado(uint indexed idContrato, address indexed comprador);
    event ContratoCancelado(uint indexed idContrato, address indexed ejecutor, string motivo, uint fechaCancelacion);
    event EntregaConfirmada(uint indexed idContrato, address vendedor);
    event ContratoCerrado(uint indexed idContrato, Estado nuevoEstado);
    event RelayerActualizado(address indexed oldRelayer, address indexed newRelayer);
    event ContratoCelebrado(uint indexed idContrato, uint fechaCelebracion);
    event PrecioFijado(uint indexed idContrato, uint precioFinal);
    // ===== CONSTRUCTOR =====
    constructor(address _trustedForwarder, address _relayer)
        ERC721("ContratoGranosSoja", "CGS")
        Ownable(msg.sender)
        ERC2771Context(_trustedForwarder)
    {
        relayer = _relayer;
    }
    modifier onlyRelayer() {
        require(_msgSender() == relayer, "Solo relayer autorizado");
        _;
    }
    // ===== ADMIN =====
    function setRelayer(address _relayer) external onlyOwner {
        emit RelayerActualizado(relayer, _relayer);
        relayer = _relayer;
    }
    // =============================================================
    // FUNCIONES PRINCIPALES
    // =============================================================
    /// @notice Crea un nuevo contrato (estado Borrador)
    function crearContrato(Contrato memory datos) external {
        contadorContratos++;
        uint id = contadorContratos;
        datos.partes.comprador = _msgSender();
        datos.estado = Estado.Borrador;
        contratos[id] = datos;
        _mint(_msgSender(), id);
        emit ContratoCreado(id, _msgSender(), datos.partes.vendedor);
    }

    /// @notice Permite al comprador modificar mientras esté Borrador o Enviado
    function editarContrato(uint id, Contrato memory nuevosDatos) external {
        Contrato storage c = contratos[id];
        require(
            c.estado == Estado.Borrador || c.estado == Estado.Enviado,
            "No editable"
        );
        require(_msgSender() == c.partes.comprador, "Solo comprador");
        nuevosDatos.partes.comprador = c.partes.comprador; // no se cambia
        nuevosDatos.estado = c.estado;
        contratos[id] = nuevosDatos;
        emit ContratoEditado(id, _msgSender());
    }

    /// @notice Envía el contrato al vendedor (backend o comprador)
    function enviarContrato(uint id) external {
        Contrato storage c = contratos[id];
        require(_msgSender() == c.partes.comprador, "Solo comprador");
        require(c.estado == Estado.Borrador, "Estado invalido");
        c.estado = Estado.Enviado;
    }

    /// @notice Firma del vendedor registrada por el relayer
    function firmarContratoMetaTx(
        uint id,
        string calldata consentHash,
        string calldata evidenceURI
    ) external onlyRelayer {
        Contrato storage c = contratos[id];
        require(c.estado == Estado.Enviado, "Debe estar Enviado");
        // 1️⃣ Fija el precio final
        _fijarPrecioFinal(id);
        // 2️⃣ Marca fecha de celebración
        c.fechaCelebracionContrato = block.timestamp;
        // 3️⃣ Actualiza estado y evidencias
        c.estado = Estado.Firmado;
        c.hashVersionContrato = consentHash;
        c.evidenceURI = evidenceURI;
        emit PrecioFijado(id, c.condicionesPrecio.precioFinal);
        emit ContratoFirmado(id, c.partes.vendedor, consentHash, evidenceURI);
        emit ContratoCelebrado(id, c.fechaCelebracionContrato);
    }

    /// @notice Calcula y fija el precio final según modalidad
    function _fijarPrecioFinal(uint id) internal {
        Contrato storage c = contratos[id];
        CondicionesPrecio storage p = c.condicionesPrecio;
        if (p.tipoContrato == TipoContrato.PrecioFijo) {
            p.precioFinal = p.precioPorToneladaMetrica;
        } else if (p.tipoContrato == TipoContrato.PrecioAFijar) {
            int ajuste = p.ajusteCBOT;
            uint base = p.precioCBOTBushel;
            uint convertido;
            if (ajuste < 0 && uint(-ajuste) > base) {
                convertido = 0;
            } else {
                uint ajustado = uint(int(base) + ajuste);
                convertido = (ajustado * 367454) / 10000; // factor 36.7454
            }
            p.precioFinal = convertido;
        }
    }

    /// @notice Confirmación de entrega (relayer / oráculo)
    function confirmarEntregaMetaTx(uint id) external onlyRelayer {
        Contrato storage c = contratos[id];
        require(c.estado == Estado.Firmado, "Debe estar Firmado");
        c.estado = Estado.Terminado;
        emit EntregaConfirmada(id, c.partes.vendedor);
        emit ContratoCerrado(id, Estado.Terminado);
    }

    /// @notice Cancelación antes de firma
    function cancelarContrato(uint id, string calldata motivo) external {
        Contrato storage c = contratos[id];
        require(
            c.estado == Estado.Borrador || c.estado == Estado.Enviado,
            "No puede cancelarse"
        );
        require(
            _msgSender() == c.partes.comprador || _msgSender() == relayer,
            "Solo comprador o relayer"
        );

        c.estado = Estado.Cancelado;
        emit ContratoCancelado(id, _msgSender(), motivo, block.timestamp);
        emit ContratoCerrado(id, Estado.Cancelado);
    }

    // =============================================================
    // LECTURA / UTILIDADES
    // =============================================================
    function obtenerContratos() external view returns (Contrato[] memory) {
        uint total = contadorContratos;
        Contrato[] memory lista = new Contrato[](total);
        for (uint i = 1; i <= total; i++) {
            lista[i - 1] = contratos[i];
        }
        return lista;
    }

    // =============================================================
    // Overrides EIP-2771
    // =============================================================
    function _msgSender()
        internal
        view
        override(Context, ERC2771Context)
        returns (address sender)
    {
        sender = ERC2771Context._msgSender();
    }

    function _msgData()
        internal
        view
        override(Context, ERC2771Context)
        returns (bytes calldata)
    {
        return ERC2771Context._msgData();
    }

    function _contextSuffixLength()
        internal
        view
        override(Context, ERC2771Context)
        returns (uint256)
    {
        return ERC2771Context._contextSuffixLength();
    }
}
