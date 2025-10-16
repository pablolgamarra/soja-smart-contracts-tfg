// SPDX-License-Identifier: MIT

pragma solidity ^0.8.30;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract ContratoGranosSoja is ERC721, Ownable {
    // ENUMS
    enum TipoContrato {PrecioFijo, PrecioAFijar}
    enum AccionIncumplimiento {Rechazo, Renogociacion, Descuento}

   // ===== STRUCT PRINCIPAL =====
    struct Contrato {
        // A. Identificación de las partes
        address comprador;
        address vendedor;
        address intermediario;
        string tipoProducto;

        // B. Condiciones comerciales
        string incoterm;
        string fleteACargoDe;
        string puntoControlCalidad;
        uint cantidadToneladas;
        uint precioPorTonelada;
        TipoContrato tipoContrato;
        uint fechaEntrega;
        string lugarEntrega;
        string condicionesCalidad;

        // C. Condiciones económicas
        string modalidadPago;
        uint montoTotal;
        bool pagado;

        // D. Cumplimiento y penalizaciones
        uint penalizacion;
        bool esPenalizacionPorcentaje;
        AccionIncumplimiento accionIncumplimiento;
        address arbitro;
        string hashVersionContrato;

        // E. Estado
        bool firmado;
        bool entregado;
        bool cerrado;
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
        address _vendedor,
        address _intermediario,
        // string memory _tipoProducto,
        string memory _incoterm,
        string memory _fleteACargoDe,
        string memory _puntoControlCalidad,
        uint _cantidadToneladas,
        uint _precioPorTonelada,
        TipoContrato _tipoContrato,
        uint _fechaEntrega,
        string memory _lugarEntrega,
        string memory _condicionesCalidad,
        string memory _modalidadPago,
        uint _penalizacion,
        bool _esPenalizacionPorcentaje,
        address _arbitro,
        string memory _hashVersionContrato
    ) external {
        contadorContratos++;
        uint id = contadorContratos;

        uint montoTotal = _cantidadToneladas * _precioPorTonelada;

        contratos[id] = Contrato({
            comprador: msg.sender,
            vendedor: _vendedor,
            intermediario: _intermediario,
            tipoProducto: "soja",
            incoterm: _incoterm,
            fleteACargoDe: _fleteACargoDe,
            puntoControlCalidad: _puntoControlCalidad,
            cantidadToneladas: _cantidadToneladas,
            precioPorTonelada: _precioPorTonelada,
            tipoContrato: _tipoContrato,
            fechaEntrega: _fechaEntrega,
            lugarEntrega: _lugarEntrega,
            condicionesCalidad: _condicionesCalidad,
            modalidadPago: _modalidadPago,
            montoTotal: montoTotal,
            pagado: false,
            penalizacion: _penalizacion,
            esPenalizacionPorcentaje: _esPenalizacionPorcentaje,
            accionIncumplimiento: AccionIncumplimiento.Rechazo,
            arbitro: _arbitro,
            hashVersionContrato: _hashVersionContrato,
            firmado: false,
            entregado: false,
            cerrado: false
        });

        _mint(msg.sender, id);
        emit ContratoCreado(id, msg.sender, _vendedor);
    }

    /// @notice El vendedor firma el contrato para validarlo
    function firmarContrato(uint _idContrato) external {
        Contrato storage contratoStorage = contratos[_idContrato];
        require(msg.sender == contratoStorage.vendedor, "Solo el vendedor puede firmar");
        require(!contratoStorage.firmado, "Ya fue firmado");
        contratoStorage.firmado = true;
        emit ContratoFirmado(_idContrato, msg.sender);
    }

    /// @notice El vendedor confirma que entrego el producto
    function confirmarEntrega(uint _idContrato) external {
        Contrato storage contratoStorage = contratos[_idContrato];
        require(msg.sender == contratoStorage.vendedor, "Solo el vendedor puede confirmar");
        require(contratoStorage.firmado, "El contrato debe estar firmado");
        contratoStorage.entregado = true;
        emit EntregaConfirmada(_idContrato, msg.sender);
    }

    /// @notice El comprador valida si la calidad cumple (simulado)
    function validarCalidad(uint _idContrato, bool _cumple) external {
        Contrato storage contratoStorage = contratos[_idContrato];
        require(msg.sender == contratoStorage.comprador, "Solo el comprador valida");
        require(contratoStorage.entregado, "No se confirmo entrega");
        if (!_cumple) {
            contratoStorage.accionIncumplimiento = AccionIncumplimiento.Descuento;
        }
        emit CalidadValidada(_idContrato, _cumple);
    }

    /// @notice El comprador realiza el pago al vendedor
    function pagar(uint _idContrato) external payable {
        Contrato storage contratoStorage = contratos[_idContrato];
        require(msg.sender == contratoStorage.comprador, "Solo el comprador puede pagar");
        require(contratoStorage.entregado, "Entrega no confirmada");
        require(!contratoStorage.pagado, "Ya fue pagado");
        require(msg.value == contratoStorage.montoTotal, "Monto incorrecto");

        payable(contratoStorage.vendedor).transfer(msg.value);
        contratoStorage.pagado = true;
        emit PagoEjecutado(_idContrato, msg.value);
    }

    /// @notice Aplica penalización si hay incumplimiento
    function aplicarPenalizacion(uint _idContrato, string memory _motivo) external {
        Contrato storage contratoStorage = contratos[_idContrato];
        require(msg.sender == contratoStorage.comprador || msg.sender == contratoStorage.arbitro, "No autorizado");
        require(!contratoStorage.cerrado, "Contrato cerrado");
        require(contratoStorage.pagado, "Debe estar pagado");

        uint penalizacionMonto = contratoStorage.penalizacion;
        if (contratoStorage.esPenalizacionPorcentaje) {
            penalizacionMonto = (contratoStorage.montoTotal * contratoStorage.penalizacion) / 100;
        }

        payable(contratoStorage.comprador).transfer(penalizacionMonto);
        emit PenalizacionAplicada(_idContrato, penalizacionMonto, _motivo);
    }

    /// @notice Cierra definitivamente el contrato
    function cerrarContrato(uint _idContrato) external {
        Contrato storage contratoStorage = contratos[_idContrato];
        require(msg.sender == contratoStorage.comprador || msg.sender == contratoStorage.arbitro, "No autorizado");
        require(contratoStorage.pagado, "Debe estar pagado");
        require(!contratoStorage.cerrado, "Ya fue cerrado");
        contratoStorage.cerrado = true;
        emit ContratoCerrado(_idContrato);
    }
}
