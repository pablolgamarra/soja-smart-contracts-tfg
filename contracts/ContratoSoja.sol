// SPDX-License-Identifier: MIT

pragma solidity ^0.8.30;

contract ContratoSoja{
    address public comprador;
    address public vendedor;
    uint public cantidadToneladas;
    uint public precioPorTonelada;
    enum Estado {Creado, Aceptado, Entregado, Finalizado, Cancelado};
    Estado public estadoActual;

    function crearContrato()
}