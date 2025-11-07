// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.30;

// import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
// import {ERC2771Context} from "@openzeppelin/contracts/metatx/ERC2771Context.sol";
// import {Context} from "@openzeppelin/contracts/utils/Context.sol";

// contract ContratoGranosSoja is ERC721, Ownable, ERC2771Context {
//     // ===== ENUMS =====
//     enum TipoContrato {PrecioFijo, PrecioAFijar}
//     enum AccionIncumplimiento {Rechazo, Renegociacion, Descuento}
//     enum Estado {Draft, Offered, Accepted, Delivered, Settled, Cancelled}

//     // ===== STRUCTS =====
//     struct IdentificadorPartes {
//         address comprador;
//         address vendedor;
//         address intermediario;
//     }

//     struct CondicionesComerciales {
//         string incoterm;
//         string fleteACargoDe;
//         string puntoControlCalidad;
//         uint cantidadToneladas;
//         uint precioPorTonelada;
//         TipoContrato tipoContrato;
//         uint fechaEntrega;
//         string lugarEntrega;
//         string condicionesCalidad;
//     }

//     struct CondicionesEconomicas {
//         string modalidadPago;
//         uint montoTotal;
//     }

//     struct PenalizacionIncumplimiento {
//         AccionIncumplimiento accionIncumplimiento;
//         uint porcentajeDescuento;
//         address arbitro;
//     }

//     struct Contrato {
//         IdentificadorPartes identificadorPartes;
//         string tipoProducto;
//         CondicionesComerciales condicionesComerciales;
//         CondicionesEconomicas condicionesEconomicas;
//         PenalizacionIncumplimiento penalizacionIncumplimiento;
//         string hashVersionContrato; // puede actualizarse con consentHash
//         string evidenceURI;         // URI a evidencias (IPFS/S3)
//         Estado estado;
//     }


    

//     // ===== VARIABLES =====
//     uint public contadorContratos;
//     mapping(uint => Contrato) public contratos;
//     address public relayer; // backend autorizado para meta-txs

//     // ===== EVENTOS =====
//     event ContratoCreado(uint indexed idContrato, address indexed comprador, address vendedor);
//     event ContratoFirmado(uint indexed idContrato, address vendedor, string consentHash, string evidenceURI);
//     event ContratoEditado(uint indexed idContrato, address indexed comprador, CondicionesComerciales nuevasCondiciones);
//     event EntregaConfirmada(uint indexed idContrato, address vendedor);
//     event PagoEjecutado(uint indexed idContrato, uint monto);
//     event PenalizacionAplicada(uint indexed idContrato, uint monto, string motivo);
//     event ContratoCerrado(uint indexed idContrato, Estado nuevoEstado);
//     event RelayerActualizado(address indexed oldRelayer, address indexed newRelayer);

//     // ===== CONSTRUCTOR =====
//     constructor(address _trustedForwarder, address _relayer)
//         ERC721("ContratoGranosSoja", "CGS")
//         Ownable(msg.sender)                // setea owner al deployer
//         ERC2771Context(_trustedForwarder)  // forwarder de EIP-2771
//     {
//         relayer = _relayer;
//     }

//     // ===== MODIFIERS =====
//     modifier onlyRelayer() {
//         require(_msgSender() == relayer, "Solo relayer autorizado");
//         _;
//     }

//     // ===== ADMIN =====
//     function setRelayer(address _relayer) external onlyOwner {
//         emit RelayerActualizado(relayer, _relayer);
//         relayer = _relayer;
//     }

//     // =============================================================
//     // FUNCIONES PRINCIPALES
//     // =============================================================

//     /// @notice Crea un nuevo contrato NFT por parte del comprador (estado Offered)
//     function crearContrato(
//         IdentificadorPartes memory _identificadorPartes,
//         CondicionesComerciales memory _condicionesComerciales,
//         string memory _modalidadPago,
//         AccionIncumplimiento _accionIncumplimiento,
//         uint _porcentajeDescuento,
//         address _arbitro,
//         string memory _hashVersionContrato
//     ) external {
//         contadorContratos++;
//         uint id = contadorContratos;

//         uint montoTotal = _condicionesComerciales.cantidadToneladas * _condicionesComerciales.precioPorTonelada;

//         contratos[id] = Contrato({
//             identificadorPartes: IdentificadorPartes({
//                 comprador: _msgSender(),
//                 vendedor: _identificadorPartes.vendedor,
//                 intermediario: _identificadorPartes.intermediario
//             }),
//             tipoProducto: "soja",
//             condicionesComerciales: _condicionesComerciales,
//             condicionesEconomicas: CondicionesEconomicas({
//                 modalidadPago: _modalidadPago,
//                 montoTotal: montoTotal
//             }),
//             penalizacionIncumplimiento: PenalizacionIncumplimiento({
//                 accionIncumplimiento: _accionIncumplimiento,
//                 porcentajeDescuento: _porcentajeDescuento,
//                 arbitro: _arbitro
//             }),
//             hashVersionContrato: _hashVersionContrato, // versión inicial (ej: hash del PDF)
//             evidenceURI: "",
//             estado: Estado.Offered
//         });

//         _mint(_msgSender(), id);
//         emit ContratoCreado(id, _msgSender(), _identificadorPartes.vendedor);
//     }

//     /// @notice El comprador edita las condiciones de un contrato antes de que el vendedor lo firme
//     function editarContrato(uint _idContrato, CondicionesComerciales memory _condicionesComerciales) external {
//         Contrato storage c = contratos[_idContrato];
//         require(c.estado == Estado.Offered, "Contrato ya no puede ser editado");
//         require(_msgSender() == c.identificadorPartes.comprador, "Solo el comprador puede editar el contrato");

//         // Actualizar las condiciones comerciales
//         c.condicionesComerciales = _condicionesComerciales;

//         emit ContratoEditado(_idContrato, _msgSender(), _condicionesComerciales);
//     }

//     /// @notice El relayer registra la aceptación en nombre del vendedor (meta-tx)
//     function firmarContratoMetaTx(
//         uint _idContrato,
//         string calldata consentHash,
//         string calldata evidenceURI
//     ) external onlyRelayer {
//         Contrato storage c = contratos[_idContrato];
//         require(c.estado == Estado.Offered, "Estado invalido: no Offered");
//         c.estado = Estado.Accepted;
//         c.hashVersionContrato = consentHash; // guarda hash del consentimiento/contrato
//         c.evidenceURI = evidenceURI;         // URI con logs (OTP, IP, timestamp)
//         emit ContratoFirmado(_idContrato, c.identificadorPartes.vendedor, consentHash, evidenceURI);
//     }

//     /// @notice El relayer confirma la entrega en nombre del vendedor (meta-tx)
//     function confirmarEntregaMetaTx(uint _idContrato) external onlyRelayer {
//         Contrato storage c = contratos[_idContrato];
//         require(c.estado == Estado.Accepted, "Estado invalido: no Accepted");
//         c.estado = Estado.Delivered;
//         emit EntregaConfirmada(_idContrato, c.identificadorPartes.vendedor);
//     }

//     /// @notice El comprador liquida el pago al vendedor
//     function pagar(uint _idContrato) external payable {
//         Contrato storage c = contratos[_idContrato];
//         require(_msgSender() == c.identificadorPartes.comprador, "Solo comprador");
//         require(c.estado == Estado.Delivered, "Debe estar Delivered");
//         require(msg.value == c.condicionesEconomicas.montoTotal, "Monto incorrecto");

//         (bool ok, ) = payable(c.identificadorPartes.vendedor).call{value: msg.value}("");
//         require(ok, "Fallo el envio de fondos");

//         c.estado = Estado.Settled;
//         emit PagoEjecutado(_idContrato, msg.value);
//     }

//     /// @notice Aplica penalizacion (post-settlement) y cierra en Cancelled
//     function aplicarPenalizacion(uint _idContrato, string calldata _motivo) external {
//         Contrato storage c = contratos[_idContrato];
//         address s = _msgSender();
//         require(s == c.identificadorPartes.comprador || s == c.penalizacionIncumplimiento.arbitro, "No autorizado");
//         require(c.estado == Estado.Settled, "Debe estar Settled");

//         uint penalizacionMonto = c.penalizacionIncumplimiento.porcentajeDescuento > 0
//             ? (c.condicionesEconomicas.montoTotal * c.penalizacionIncumplimiento.porcentajeDescuento) / 100
//             : 0;

//         if (penalizacionMonto > 0) {
//             (bool ok, ) = payable(c.identificadorPartes.comprador).call{value: penalizacionMonto}("");
//             require(ok, "Fallo reembolso penalizacion");
//         }

//         c.estado = Estado.Cancelled;
//         emit PenalizacionAplicada(_idContrato, penalizacionMonto, _motivo);
//         emit ContratoCerrado(_idContrato, Estado.Cancelled);
//     }

//     function obtenerContratos() external view returns (Contrato[] memory) {
//         uint totalContratos = contadorContratos;
//         Contrato[] memory contratosListados = new Contrato[](totalContratos);

//         for (uint i = 1; i <= totalContratos; i++) {
//             contratosListados[i - 1] = contratos[i]; // Guardar cada contrato en el array
//         }

//         return contratosListados;
//     }


//     // ===== OVERRIDES EIP-2771 =====
//     function _msgSender()
//         internal
//         view
//         override(Context, ERC2771Context)
//         returns (address sender)
//     {
//         sender = ERC2771Context._msgSender();
//     }

//     function _msgData()
//         internal
//         view
//         override(Context, ERC2771Context)
//         returns (bytes calldata)
//     {
//         return ERC2771Context._msgData();
//     }

//     function _contextSuffixLength()
//         internal
//         view
//         override(Context, ERC2771Context)
//         returns (uint256)
//     {
//         return ERC2771Context._contextSuffixLength();
//     }
// }


// SPDX-License-Identifier: MIT

// CONTRATO DE COMPRA-VENTA BASADO EN ANEC 41 https://es.scribd.com/doc/58355917/ANEC-41-Soybeans
pragma solidity ^0.8.30;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC2771Context} from "@openzeppelin/contracts/metatx/ERC2771Context.sol";
import {Context} from "@openzeppelin/contracts/utils/Context.sol";

contract ContratoGranosSoja is ERC721, Ownable, ERC2771Context {
    // ===== ENUMS =====
    enum TipoContrato {PrecioFijo, PrecioAFijar}
    enum AccionIncumplimiento {Rechazo, Renegociacion, Descuento}
    enum Estado {Draft, Offered, Accepted, Delivered, Settled, Cancelled}

    // ===== STRUCTS =====
    struct IdentificadorPartes {
        address comprador;
        address vendedor;
        address intermediario;
    }

    struct CondicionesComerciales {
        string incoterm;
        string fleteACargoDe;
        string puntoControlCalidad;
        uint cantidadToneladas;           // en toneladas
        uint precioPorTonelada;           // en wei o unidad base
        TipoContrato tipoContrato;
        uint fechaEntrega;                // unix timestamp
        string lugarEntrega;
        string condicionesCalidad;        // texto breve (p. ej. "Humedad <13%")
    }

    struct CondicionesEconomicas {
        string modalidadPago;
        uint montoTotal;
    }

    struct PenalizacionIncumplimiento {
        AccionIncumplimiento accionIncumplimiento;
        uint porcentajeDescuento;
        address arbitro;
    }

    /// --- Nuevas: Estructura para mapear los puntos ANEC41
    struct ANEC41Clauses {
        // 1. objeto / producto
        string productoDescripcion;            // variedad, GMO info
        bool gmoPermitido;

        // 2. cantidad y tolerancia
        uint toleranciaToneladas;              // tolerancia absoluta (ej: 1 = 1 tonelada)
        uint toleranciaPorMil;                 // tolerancia en ‰ (permite expresión relativa)

        // 3. calidad (valores numéricos clave, guardados con escala si hace falta)
        uint humedadMaxPorMil;                 // humedad max * 1000 (ej 13% => 13000) para evitar decimales
        uint impurezasMaxPorMil;               // impurezas % * 1000
        string parametrosAdicionales;          // texto con parámetros no estructurados

        // 4. muestreo y método
        string metodoMuestreo;                 // p. ej. "GAFTA sampling 27"
        string puntoMuestreo;                  // carga/descarga/centro de control

        // 5. peso y base
        string basePeso;                       // "Carga" o "Descarga"

        // 6. embalaje y marcado
        string embalaje;                       // p. ej. "Sacos 50kg / Bulk"
        
        // 7. seguros y flete (flags)
        bool seguroObligatorio;
        string responsableSeguro;              // "Comprador" | "Vendedor"

        // 8. documentación requerida
        bool requiereCertFitosanitario;
        bool requiereAnalisisLaboratorio;
        string docsAdicionales;

        // 9. fuerza mayor (texto) - se refiere al ANEC clause
        string fuerzaMayorTexto;

        // 10. resolución y arbitraje
        string leyAplicable;
        string institucionArbitral;            // p. ej. "GAFTA / ICC / Local: Cámara X"

        // 11. referencia off-chain
        string clauseIPFSHash;                 // IPFS hash con el texto ANEC41 completo y cláusulas detalladas
    }

    struct Contrato {
        IdentificadorPartes identificadorPartes;
        string tipoProducto;
        CondicionesComerciales condicionesComerciales;
        CondicionesEconomicas condicionesEconomicas;
        PenalizacionIncumplimiento penalizacionIncumplimiento;
        ANEC41Clauses anec41;          // <-- nuevo campo que contiene los puntos ANEC41
        string evidenceURI;
        Estado estado;
    }

    // ===== VARIABLES =====
    uint public contadorContratos;
    mapping(uint => Contrato) public contratos;
    address public relayer;

    // ===== EVENTOS =====
    event ContratoCreado(uint indexed idContrato, address indexed comprador, address vendedor);
    event ANEC41Set(uint indexed idContrato, string ipfsHash);
    event ContratoFirmado(uint indexed idContrato, address vendedor, string consentHash, string evidenceURI);
    event EntregaConfirmada(uint indexed idContrato, address vendedor);
    event PagoEjecutado(uint indexed idContrato, uint monto);
    event PenalizacionAplicada(uint indexed idContrato, uint monto, string motivo);
    event ContratoCerrado(uint indexed idContrato, Estado nuevoEstado);
    event RelayerActualizado(address indexed oldRelayer, address indexed newRelayer);

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

    function setRelayer(address _relayer) external onlyOwner {
        emit RelayerActualizado(relayer, _relayer);
        relayer = _relayer;
    }

    /// Crear contrato (ahora ofrece espacio para anec41)
    function crearContrato(
        IdentificadorPartes memory _identificadorPartes,
        CondicionesComerciales memory _condicionesComerciales,
        string memory _modalidadPago,
        AccionIncumplimiento _accionIncumplimiento,
        uint _porcentajeDescuento,
        address _arbitro,
        string memory _hashVersionContrato,
        ANEC41Clauses memory _anec41
    ) external {
        contadorContratos++;
        uint id = contadorContratos;

        uint montoTotal = _condicionesComerciales.cantidadToneladas * _condiciones_comerciales_precioToWei(_condicionesComerciales.precioPorTonelada);

        contratos[id] = Contrato({
            identificadorPartes: IdentificadorPartes({
                comprador: _msgSender(),
                vendedor: _identificadorPartes.vendedor,
                intermediario: _identificadorPartes.intermediario
            }),
            tipoProducto: "soja",
            condicionesComerciales: _condicionesComerciales,
            condicionesEconomicas: CondicionesEconomicas({
                modalidadPago: _modalidadPago,
                montoTotal: montoTotal
            }),
            penalizacionIncumplimiento: PenalizacionIncumplimiento({
                accionIncumplimiento: _accionIncumplimiento,
                porcentajeDescuento: _porcentajeDescuento,
                arbitro: _arbitro
            }),
            anec41: _anec41,
            evidenceURI: "",
            estado: Estado.Offered
        });

        _mint(_msgSender(), id);
        emit ContratoCreado(id, _msgSender(), _identificadorPartes.vendedor);
        emit ANEC41Set(id, _anec41.clauseIPFSHash);
    }

    // Función utilitaria ejemplo para convertir precio por tonelada si quieres escalar / validar.
    function _condiciones_comerciales_precioToWei(uint precioPorTonelada) internal pure returns (uint) {
        // aquí asumes que precioPorTonelada ya viene en wei; si no, aplica conversión
        return precioPorTonelada;
    }

    /// Permite al comprador actualizar la referencia ANEC41 (antes de la firma)
    function actualizarANEC41(uint _idContrato, ANEC41Clauses memory _anec41) external {
        Contrato storage c = contratos[_idContrato];
        require(c.estado == Estado.Offered, "No editable");
        require(_msgSender() == c.identificadorPartes.comprador, "Solo comprador");
        c.anec41 = _anec41;
        emit ANEC41Set(_idContrato, _anec41.clauseIPFSHash);
    }

    // resto de funciones: firmarContratoMetaTx, confirmarEntregaMetaTx, pagar, aplicarPenalizacion, etc.
    // (mantenemos las funciones previas tal cual)
    
    // Ejemplo simple de getter especializado para verificar parámetros ANEC41 importantes
    function getANEC41(uint _idContrato) external view returns (ANEC41Clauses memory) {
        return contratos[_idContrato].anec41;
    }

    // ... overrides _msgSender/_msgData/_contextSuffixLength (igual que antes) ...
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
