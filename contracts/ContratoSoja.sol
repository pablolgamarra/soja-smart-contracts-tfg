// SPDX-License-Identifier: MIT

pragma solidity ^0.8.30;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract ContratoGranosSoja is ERC721, Ownable {
    // ENUMS
    enum TipoContrato {PrecioFijo, PrecioAFijar}
    enum AccionIncumplimiento {Rechazo, Renegociacion, Descuento}

    // ===== STRUCTS =====
    struct IdentificadorPartes{
        address comprador;
        address vendedor;
        address intermediario;
    }

    struct CondicionesComerciales{
        string incoterm;
        string fleteACargoDe;
        string puntoControlCalidad;
        uint cantidadToneladas;
        uint precioPorTonelada;
        TipoContrato tipoContrato;
        uint fechaEntrega;
        string lugarEntrega;
        string condicionesCalidad;
    }

    struct CondicionesEconomicas{
        string modalidadPago;
        uint montoTotal;
    }

    struct PenalizacionIncumplimiento{
        AccionIncumplimiento accionIncumplimiento;
        uint porcentajeDescuento;
        address arbitro;
    }
    
    struct EstadoContrato{
        bool firmado;
        bool entregado;
        bool pagado;
        bool cerrado;
    }

   // ===== STRUCT PRINCIPAL =====
    struct Contrato {
        // A. Identificación de las partes
        IdentificadorPartes identificadorPartes;

        // B. Condiciones comerciales
        string tipoProducto;
        CondicionesComerciales condicionesComerciales;

        // C. Condiciones económicas
        CondicionesEconomicas condicionesEconomicas;

        // D. Cumplimiento y penalizaciones
        PenalizacionIncumplimiento penalizacionIncumplimiento;
        string hashVersionContrato;

        // E. Estado
        EstadoContrato estadoContrato;
    }

    // ===== VARIABLES =====
    uint public contadorContratos;
    mapping(uint => Contrato) public contratos;

    // ===== EVENTOS =====
    event ContratoCreado(uint indexed idContrato, address indexed comprador, address vendedor);
    event ContratoFirmado(uint indexed idContrato, address vendedor);
    event EntregaConfirmada(uint indexed idContrato, address vendedor);
    event CalidadValidada(uint indexed idContrato, bool cumple);
    event PagoEjecutado(uint indexed idContrato, uint monto);
    event PenalizacionAplicada(uint indexed idContrato, uint monto, string motivo);
    event ContratoCerrado(uint indexed idContrato);

    // ===== CONSTRUCTOR =====
    constructor() ERC721("ContratoGranosSoja", "CGS") Ownable(msg.sender) {}

    // =============================================================
    // FUNCIONES PRINCIPALES
    // =============================================================

    /// @notice Crea un nuevo contrato NFT por parte del comprador
    function crearContrato(
        IdentificadorPartes memory _identificadorPartes,
        // string memory _tipoProducto,
        CondicionesComerciales memory _condicionesComerciales,
        // string memory _incoterm,
        // string memory _fleteACargoDe,
        // string memory _puntoControlCalidad,
        // uint _cantidadToneladas,
        // uint _precioPorTonelada,
        // TipoContrato _tipoContrato,
        // uint _fechaEntrega,
        // string memory _lugarEntrega,
        // string memory _condicionesCalidad,
        string memory _modalidadPago,
        AccionIncumplimiento _accionIncumplimiento,
        uint _porcentajeDescuento,
        address _arbitro,
        string memory _hashVersionContrato
    ) external {
        contadorContratos++;
        uint id = contadorContratos;

        uint montoTotal = _condicionesComerciales.cantidadToneladas * _condicionesComerciales.precioPorTonelada;

        contratos[id] = Contrato({
            identificadorPartes: IdentificadorPartes({
                comprador: msg.sender,
                vendedor: _identificadorPartes.vendedor,
                intermediario: _identificadorPartes.intermediario
            }),

            tipoProducto: "soja",
            
            condicionesComerciales: CondicionesComerciales({
                incoterm: _condicionesComerciales.incoterm,
                fleteACargoDe: _condicionesComerciales.fleteACargoDe,
                puntoControlCalidad: _condicionesComerciales.puntoControlCalidad,
                cantidadToneladas: _condicionesComerciales.cantidadToneladas,
                precioPorTonelada: _condicionesComerciales.precioPorTonelada,
                tipoContrato: _condicionesComerciales.tipoContrato,
                fechaEntrega: _condicionesComerciales.fechaEntrega,
                lugarEntrega: _condicionesComerciales.lugarEntrega,
                condicionesCalidad: _condicionesComerciales.condicionesCalidad
            }),

            condicionesEconomicas: CondicionesEconomicas({
                modalidadPago: _modalidadPago,
                montoTotal: montoTotal
            }),

            penalizacionIncumplimiento: PenalizacionIncumplimiento({
                accionIncumplimiento: _accionIncumplimiento,
                porcentajeDescuento: _porcentajeDescuento,
                arbitro: _arbitro
            }),
            hashVersionContrato: _hashVersionContrato,
            estadoContrato: EstadoContrato({
                firmado: false,
                entregado: false,
                pagado: false,
                cerrado: false
            })
        });

        _mint(msg.sender, id);
        emit ContratoCreado(id, msg.sender, _identificadorPartes.vendedor);
    }

    /// @notice El vendedor firma el contrato para validarlo
    function firmarContrato(uint _idContrato) external {
        Contrato storage contratoStorage = contratos[_idContrato];
        require(msg.sender == contratoStorage.identificadorPartes.vendedor, "Solo el vendedor puede firmar");
        require(!contratoStorage.estadoContrato.firmado, "Ya fue firmado");
        contratoStorage.estadoContrato.firmado = true;
        emit ContratoFirmado(_idContrato, msg.sender);
    }

    /// @notice El vendedor confirma que entrego el producto
    function confirmarEntrega(uint _idContrato) external {
        Contrato storage contratoStorage = contratos[_idContrato];
        require(msg.sender == contratoStorage.identificadorPartes.vendedor, "Solo el vendedor puede confirmar");
        require(contratoStorage.estadoContrato.firmado, "El contrato debe estar firmado");
        contratoStorage.estadoContrato.entregado = true;
        emit EntregaConfirmada(_idContrato, msg.sender);
    }

    /// @notice El comprador valida si la calidad cumple (simulado)
    function validarCalidad(uint _idContrato, bool _cumple) external {
        Contrato storage contratoStorage = contratos[_idContrato];
        require(msg.sender == contratoStorage.identificadorPartes.comprador, "Solo el comprador valida");
        require(contratoStorage.estadoContrato.entregado, "No se confirmo entrega");
        if (!_cumple) {
            contratoStorage.penalizacionIncumplimiento.accionIncumplimiento = AccionIncumplimiento.Descuento;
        }
        emit CalidadValidada(_idContrato, _cumple);
    }

    /// @notice El comprador realiza el pago al vendedor
    function pagar(uint _idContrato) external payable {
        Contrato storage contratoStorage = contratos[_idContrato];
        require(msg.sender == contratoStorage.identificadorPartes.comprador, "Solo el comprador puede pagar");
        require(contratoStorage.estadoContrato.entregado, "Entrega no confirmada");
        require(!contratoStorage.estadoContrato.pagado, "Ya fue pagado");
        require(msg.value == contratoStorage.condicionesEconomicas.montoTotal, "Monto incorrecto");

        payable(contratoStorage.identificadorPartes.vendedor).transfer(msg.value);
        contratoStorage.estadoContrato.pagado = true;
        emit PagoEjecutado(_idContrato, msg.value);
    }

    /// @notice Aplica penalización si hay incumplimiento
    function aplicarPenalizacion(uint _idContrato, string memory _motivo) external {
        Contrato storage contratoStorage = contratos[_idContrato];
        require(msg.sender == contratoStorage.identificadorPartes.comprador || msg.sender == contratoStorage.penalizacionIncumplimiento.arbitro, "No autorizado");
        require(!contratoStorage.estadoContrato.cerrado, "Contrato cerrado");
        require(contratoStorage.estadoContrato.pagado, "Debe estar pagado");

        uint penalizacionMonto = contratoStorage.penalizacionIncumplimiento.porcentajeDescuento > 0 ?
            (contratoStorage.condicionesEconomicas.montoTotal * contratoStorage.penalizacionIncumplimiento.porcentajeDescuento) / 100 : 0;
        
        payable(contratoStorage.identificadorPartes.comprador).transfer(penalizacionMonto);
        emit PenalizacionAplicada(_idContrato, penalizacionMonto, _motivo);
    }

    /// @notice Cierra definitivamente el contrato
    function cerrarContrato(uint _idContrato) external {
        Contrato storage contratoStorage = contratos[_idContrato];
        require(msg.sender == contratoStorage.identificadorPartes.comprador || msg.sender == contratoStorage.penalizacionIncumplimiento.arbitro, "No autorizado");
        require(contratoStorage.estadoContrato.pagado, "Debe estar pagado");
        require(!contratoStorage.estadoContrato.cerrado, "Ya fue cerrado");
        contratoStorage.estadoContrato.cerrado = true;
        emit ContratoCerrado(_idContrato);
    }
}
