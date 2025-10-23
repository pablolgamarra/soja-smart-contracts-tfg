// TODO: Automatizar actualizacion del ABI y direccion del contrato (PUEDE SER LEYENDO EL ARTIFACTO GENERADO POR HARDHAT)
export const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const CONTRACT_ABI = [
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    }
                ],
                "name": "ERC721IncorrectOwner",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "operator",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "ERC721InsufficientApproval",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "approver",
                        "type": "address"
                    }
                ],
                "name": "ERC721InvalidApprover",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "operator",
                        "type": "address"
                    }
                ],
                "name": "ERC721InvalidOperator",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    }
                ],
                "name": "ERC721InvalidOwner",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "receiver",
                        "type": "address"
                    }
                ],
                "name": "ERC721InvalidReceiver",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "sender",
                        "type": "address"
                    }
                ],
                "name": "ERC721InvalidSender",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "ERC721NonexistentToken",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    }
                ],
                "name": "OwnableInvalidOwner",
                "type": "error"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "account",
                        "type": "address"
                    }
                ],
                "name": "OwnableUnauthorizedAccount",
                "type": "error"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "approved",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "Approval",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "operator",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "bool",
                        "name": "approved",
                        "type": "bool"
                    }
                ],
                "name": "ApprovalForAll",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "idContrato",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "bool",
                        "name": "cumple",
                        "type": "bool"
                    }
                ],
                "name": "CalidadValidada",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "idContrato",
                        "type": "uint256"
                    }
                ],
                "name": "ContratoCerrado",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "idContrato",
                        "type": "uint256"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "comprador",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "vendedor",
                        "type": "address"
                    }
                ],
                "name": "ContratoCreado",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "idContrato",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "vendedor",
                        "type": "address"
                    }
                ],
                "name": "ContratoFirmado",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "idContrato",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "vendedor",
                        "type": "address"
                    }
                ],
                "name": "EntregaConfirmada",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "previousOwner",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "OwnershipTransferred",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "idContrato",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "monto",
                        "type": "uint256"
                    }
                ],
                "name": "PagoEjecutado",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "idContrato",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "monto",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "string",
                        "name": "motivo",
                        "type": "string"
                    }
                ],
                "name": "PenalizacionAplicada",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "indexed": true,
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "Transfer",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_idContrato",
                        "type": "uint256"
                    },
                    {
                        "internalType": "string",
                        "name": "_motivo",
                        "type": "string"
                    }
                ],
                "name": "aplicarPenalizacion",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "approve",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    }
                ],
                "name": "balanceOf",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_idContrato",
                        "type": "uint256"
                    }
                ],
                "name": "cerrarContrato",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_idContrato",
                        "type": "uint256"
                    }
                ],
                "name": "confirmarEntrega",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "contadorContratos",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "contratos",
                "outputs": [
                    {
                        "components": [
                            {
                                "internalType": "address",
                                "name": "comprador",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "vendedor",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "intermediario",
                                "type": "address"
                            }
                        ],
                        "internalType": "struct ContratoGranosSoja.IdentificadorPartes",
                        "name": "identificadorPartes",
                        "type": "tuple"
                    },
                    {
                        "internalType": "string",
                        "name": "tipoProducto",
                        "type": "string"
                    },
                    {
                        "components": [
                            {
                                "internalType": "string",
                                "name": "incoterm",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "fleteACargoDe",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "puntoControlCalidad",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "cantidadToneladas",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "precioPorTonelada",
                                "type": "uint256"
                            },
                            {
                                "internalType": "enum ContratoGranosSoja.TipoContrato",
                                "name": "tipoContrato",
                                "type": "uint8"
                            },
                            {
                                "internalType": "uint256",
                                "name": "fechaEntrega",
                                "type": "uint256"
                            },
                            {
                                "internalType": "string",
                                "name": "lugarEntrega",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "condicionesCalidad",
                                "type": "string"
                            }
                        ],
                        "internalType": "struct ContratoGranosSoja.CondicionesComerciales",
                        "name": "condicionesComerciales",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "string",
                                "name": "modalidadPago",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "montoTotal",
                                "type": "uint256"
                            }
                        ],
                        "internalType": "struct ContratoGranosSoja.CondicionesEconomicas",
                        "name": "condicionesEconomicas",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "enum ContratoGranosSoja.AccionIncumplimiento",
                                "name": "accionIncumplimiento",
                                "type": "uint8"
                            },
                            {
                                "internalType": "uint256",
                                "name": "porcentajeDescuento",
                                "type": "uint256"
                            },
                            {
                                "internalType": "address",
                                "name": "arbitro",
                                "type": "address"
                            }
                        ],
                        "internalType": "struct ContratoGranosSoja.PenalizacionIncumplimiento",
                        "name": "penalizacionIncumplimiento",
                        "type": "tuple"
                    },
                    {
                        "internalType": "string",
                        "name": "hashVersionContrato",
                        "type": "string"
                    },
                    {
                        "components": [
                            {
                                "internalType": "bool",
                                "name": "firmado",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "entregado",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "pagado",
                                "type": "bool"
                            },
                            {
                                "internalType": "bool",
                                "name": "cerrado",
                                "type": "bool"
                            }
                        ],
                        "internalType": "struct ContratoGranosSoja.EstadoContrato",
                        "name": "estadoContrato",
                        "type": "tuple"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "components": [
                            {
                                "internalType": "address",
                                "name": "comprador",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "vendedor",
                                "type": "address"
                            },
                            {
                                "internalType": "address",
                                "name": "intermediario",
                                "type": "address"
                            }
                        ],
                        "internalType": "struct ContratoGranosSoja.IdentificadorPartes",
                        "name": "_identificadorPartes",
                        "type": "tuple"
                    },
                    {
                        "components": [
                            {
                                "internalType": "string",
                                "name": "incoterm",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "fleteACargoDe",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "puntoControlCalidad",
                                "type": "string"
                            },
                            {
                                "internalType": "uint256",
                                "name": "cantidadToneladas",
                                "type": "uint256"
                            },
                            {
                                "internalType": "uint256",
                                "name": "precioPorTonelada",
                                "type": "uint256"
                            },
                            {
                                "internalType": "enum ContratoGranosSoja.TipoContrato",
                                "name": "tipoContrato",
                                "type": "uint8"
                            },
                            {
                                "internalType": "uint256",
                                "name": "fechaEntrega",
                                "type": "uint256"
                            },
                            {
                                "internalType": "string",
                                "name": "lugarEntrega",
                                "type": "string"
                            },
                            {
                                "internalType": "string",
                                "name": "condicionesCalidad",
                                "type": "string"
                            }
                        ],
                        "internalType": "struct ContratoGranosSoja.CondicionesComerciales",
                        "name": "_condicionesComerciales",
                        "type": "tuple"
                    },
                    {
                        "internalType": "string",
                        "name": "_modalidadPago",
                        "type": "string"
                    },
                    {
                        "internalType": "enum ContratoGranosSoja.AccionIncumplimiento",
                        "name": "_accionIncumplimiento",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_porcentajeDescuento",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "_arbitro",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "_hashVersionContrato",
                        "type": "string"
                    }
                ],
                "name": "crearContrato",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_idContrato",
                        "type": "uint256"
                    }
                ],
                "name": "firmarContrato",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "getApproved",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "owner",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "operator",
                        "type": "address"
                    }
                ],
                "name": "isApprovedForAll",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "name",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "ownerOf",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_idContrato",
                        "type": "uint256"
                    }
                ],
                "name": "pagar",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "renounceOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "safeTransferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bytes",
                        "name": "data",
                        "type": "bytes"
                    }
                ],
                "name": "safeTransferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "operator",
                        "type": "address"
                    },
                    {
                        "internalType": "bool",
                        "name": "approved",
                        "type": "bool"
                    }
                ],
                "name": "setApprovalForAll",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "bytes4",
                        "name": "interfaceId",
                        "type": "bytes4"
                    }
                ],
                "name": "supportsInterface",
                "outputs": [
                    {
                        "internalType": "bool",
                        "name": "",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "symbol",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "tokenURI",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "from",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "tokenId",
                        "type": "uint256"
                    }
                ],
                "name": "transferFrom",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "newOwner",
                        "type": "address"
                    }
                ],
                "name": "transferOwnership",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "_idContrato",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "_cumple",
                        "type": "bool"
                    }
                ],
                "name": "validarCalidad",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
];
export const RPC_URL = "http://127.0.0.1:8545";
