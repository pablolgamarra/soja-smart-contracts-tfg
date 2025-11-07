// TODO: Automatizar actualizacion del ABI y direccion del contrato (PUEDE SER LEYENDO EL ARTIFACTO GENERADO POR HARDHAT)
export const CONTRACT_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
export const CONTRACT_ABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_trustedForwarder",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "_relayer",
          "type": "address"
        }
      ],
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
          "indexed": true,
          "internalType": "address",
          "name": "ejecutor",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "motivo",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "fechaCancelacion",
          "type": "uint256"
        }
      ],
      "name": "ContratoCancelado",
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
          "name": "fechaCelebracion",
          "type": "uint256"
        }
      ],
      "name": "ContratoCelebrado",
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
          "internalType": "enum ContratoGranosSoja.Estado",
          "name": "nuevoEstado",
          "type": "uint8"
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
          "indexed": true,
          "internalType": "address",
          "name": "comprador",
          "type": "address"
        }
      ],
      "name": "ContratoEditado",
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
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "consentHash",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "evidenceURI",
          "type": "string"
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
          "name": "precioFinal",
          "type": "uint256"
        }
      ],
      "name": "PrecioFijado",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "oldRelayer",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newRelayer",
          "type": "address"
        }
      ],
      "name": "RelayerActualizado",
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
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "textoClausula",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "CID",
          "type": "string"
        }
      ],
      "name": "agregarClausulaAdicional",
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
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "motivo",
          "type": "string"
        }
      ],
      "name": "cancelarContrato",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "confirmarEntregaMetaTx",
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
              "internalType": "string",
              "name": "nroIdentidadComprador",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "nombreComprador",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "vendedor",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "nroIdentidadVendedor",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "nombreVendedor",
              "type": "string"
            },
            {
              "internalType": "address",
              "name": "broker",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "nroIdentidadBroker",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "nombreBroker",
              "type": "string"
            }
          ],
          "internalType": "struct ContratoGranosSoja.Partes",
          "name": "partes",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "cantidadToneladasMetricas",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "tipoGrano",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "cosecha",
              "type": "string"
            }
          ],
          "internalType": "struct ContratoGranosSoja.CondicionesGrano",
          "name": "condicionesGrano",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "empaque",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "fechaEntregaInicio",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "fechaEntregaFin",
              "type": "uint256"
            }
          ],
          "internalType": "struct ContratoGranosSoja.CondicionesEntrega",
          "name": "condicionesEntrega",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "enum ContratoGranosSoja.TipoContrato",
              "name": "tipoContrato",
              "type": "uint8"
            },
            {
              "internalType": "uint256",
              "name": "precioPorToneladaMetrica",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "precioCBOTBushel",
              "type": "uint256"
            },
            {
              "internalType": "int256",
              "name": "ajusteCBOT",
              "type": "int256"
            },
            {
              "internalType": "uint256",
              "name": "fechaPrecioChicago",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "incoterm",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "precioFinal",
              "type": "uint256"
            }
          ],
          "internalType": "struct ContratoGranosSoja.CondicionesPrecio",
          "name": "condicionesPrecio",
          "type": "tuple"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "puertoEmbarque",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "destinoFinal",
              "type": "string"
            }
          ],
          "internalType": "struct ContratoGranosSoja.CondicionesEmbarque",
          "name": "condicionesEmbarque",
          "type": "tuple"
        },
        {
          "internalType": "string",
          "name": "hashVersionContrato",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "evidenceURI",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "fechaCelebracionContrato",
          "type": "uint256"
        },
        {
          "internalType": "enum ContratoGranosSoja.Estado",
          "name": "estado",
          "type": "uint8"
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
              "components": [
                {
                  "internalType": "address",
                  "name": "comprador",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "nroIdentidadComprador",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "nombreComprador",
                  "type": "string"
                },
                {
                  "internalType": "address",
                  "name": "vendedor",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "nroIdentidadVendedor",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "nombreVendedor",
                  "type": "string"
                },
                {
                  "internalType": "address",
                  "name": "broker",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "nroIdentidadBroker",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "nombreBroker",
                  "type": "string"
                }
              ],
              "internalType": "struct ContratoGranosSoja.Partes",
              "name": "partes",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "cantidadToneladasMetricas",
                  "type": "uint256"
                },
                {
                  "internalType": "string",
                  "name": "tipoGrano",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "cosecha",
                  "type": "string"
                }
              ],
              "internalType": "struct ContratoGranosSoja.CondicionesGrano",
              "name": "condicionesGrano",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "empaque",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "fechaEntregaInicio",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "fechaEntregaFin",
                  "type": "uint256"
                }
              ],
              "internalType": "struct ContratoGranosSoja.CondicionesEntrega",
              "name": "condicionesEntrega",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "enum ContratoGranosSoja.TipoContrato",
                  "name": "tipoContrato",
                  "type": "uint8"
                },
                {
                  "internalType": "uint256",
                  "name": "precioPorToneladaMetrica",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "precioCBOTBushel",
                  "type": "uint256"
                },
                {
                  "internalType": "int256",
                  "name": "ajusteCBOT",
                  "type": "int256"
                },
                {
                  "internalType": "uint256",
                  "name": "fechaPrecioChicago",
                  "type": "uint256"
                },
                {
                  "internalType": "string",
                  "name": "incoterm",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "precioFinal",
                  "type": "uint256"
                }
              ],
              "internalType": "struct ContratoGranosSoja.CondicionesPrecio",
              "name": "condicionesPrecio",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "puertoEmbarque",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "destinoFinal",
                  "type": "string"
                }
              ],
              "internalType": "struct ContratoGranosSoja.CondicionesEmbarque",
              "name": "condicionesEmbarque",
              "type": "tuple"
            },
            {
              "internalType": "string",
              "name": "hashVersionContrato",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "evidenceURI",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "fechaCelebracionContrato",
              "type": "uint256"
            },
            {
              "internalType": "enum ContratoGranosSoja.Estado",
              "name": "estado",
              "type": "uint8"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "textoClausula",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "CID",
                  "type": "string"
                }
              ],
              "internalType": "struct ContratoGranosSoja.ClausulaAdicional[]",
              "name": "clausulasAdicionales",
              "type": "tuple[]"
            }
          ],
          "internalType": "struct ContratoGranosSoja.Contrato",
          "name": "datos",
          "type": "tuple"
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
          "name": "id",
          "type": "uint256"
        },
        {
          "components": [
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "comprador",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "nroIdentidadComprador",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "nombreComprador",
                  "type": "string"
                },
                {
                  "internalType": "address",
                  "name": "vendedor",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "nroIdentidadVendedor",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "nombreVendedor",
                  "type": "string"
                },
                {
                  "internalType": "address",
                  "name": "broker",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "nroIdentidadBroker",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "nombreBroker",
                  "type": "string"
                }
              ],
              "internalType": "struct ContratoGranosSoja.Partes",
              "name": "partes",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "cantidadToneladasMetricas",
                  "type": "uint256"
                },
                {
                  "internalType": "string",
                  "name": "tipoGrano",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "cosecha",
                  "type": "string"
                }
              ],
              "internalType": "struct ContratoGranosSoja.CondicionesGrano",
              "name": "condicionesGrano",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "empaque",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "fechaEntregaInicio",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "fechaEntregaFin",
                  "type": "uint256"
                }
              ],
              "internalType": "struct ContratoGranosSoja.CondicionesEntrega",
              "name": "condicionesEntrega",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "enum ContratoGranosSoja.TipoContrato",
                  "name": "tipoContrato",
                  "type": "uint8"
                },
                {
                  "internalType": "uint256",
                  "name": "precioPorToneladaMetrica",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "precioCBOTBushel",
                  "type": "uint256"
                },
                {
                  "internalType": "int256",
                  "name": "ajusteCBOT",
                  "type": "int256"
                },
                {
                  "internalType": "uint256",
                  "name": "fechaPrecioChicago",
                  "type": "uint256"
                },
                {
                  "internalType": "string",
                  "name": "incoterm",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "precioFinal",
                  "type": "uint256"
                }
              ],
              "internalType": "struct ContratoGranosSoja.CondicionesPrecio",
              "name": "condicionesPrecio",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "puertoEmbarque",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "destinoFinal",
                  "type": "string"
                }
              ],
              "internalType": "struct ContratoGranosSoja.CondicionesEmbarque",
              "name": "condicionesEmbarque",
              "type": "tuple"
            },
            {
              "internalType": "string",
              "name": "hashVersionContrato",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "evidenceURI",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "fechaCelebracionContrato",
              "type": "uint256"
            },
            {
              "internalType": "enum ContratoGranosSoja.Estado",
              "name": "estado",
              "type": "uint8"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "textoClausula",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "CID",
                  "type": "string"
                }
              ],
              "internalType": "struct ContratoGranosSoja.ClausulaAdicional[]",
              "name": "clausulasAdicionales",
              "type": "tuple[]"
            }
          ],
          "internalType": "struct ContratoGranosSoja.Contrato",
          "name": "nuevosDatos",
          "type": "tuple"
        }
      ],
      "name": "editarContrato",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "consentHash",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "evidenceURI",
          "type": "string"
        }
      ],
      "name": "firmarContratoMetaTx",
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
      "inputs": [
        {
          "internalType": "address",
          "name": "forwarder",
          "type": "address"
        }
      ],
      "name": "isTrustedForwarder",
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
      "name": "obtenerContratos",
      "outputs": [
        {
          "components": [
            {
              "components": [
                {
                  "internalType": "address",
                  "name": "comprador",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "nroIdentidadComprador",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "nombreComprador",
                  "type": "string"
                },
                {
                  "internalType": "address",
                  "name": "vendedor",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "nroIdentidadVendedor",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "nombreVendedor",
                  "type": "string"
                },
                {
                  "internalType": "address",
                  "name": "broker",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "nroIdentidadBroker",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "nombreBroker",
                  "type": "string"
                }
              ],
              "internalType": "struct ContratoGranosSoja.Partes",
              "name": "partes",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "uint256",
                  "name": "cantidadToneladasMetricas",
                  "type": "uint256"
                },
                {
                  "internalType": "string",
                  "name": "tipoGrano",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "cosecha",
                  "type": "string"
                }
              ],
              "internalType": "struct ContratoGranosSoja.CondicionesGrano",
              "name": "condicionesGrano",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "empaque",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "fechaEntregaInicio",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "fechaEntregaFin",
                  "type": "uint256"
                }
              ],
              "internalType": "struct ContratoGranosSoja.CondicionesEntrega",
              "name": "condicionesEntrega",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "enum ContratoGranosSoja.TipoContrato",
                  "name": "tipoContrato",
                  "type": "uint8"
                },
                {
                  "internalType": "uint256",
                  "name": "precioPorToneladaMetrica",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "precioCBOTBushel",
                  "type": "uint256"
                },
                {
                  "internalType": "int256",
                  "name": "ajusteCBOT",
                  "type": "int256"
                },
                {
                  "internalType": "uint256",
                  "name": "fechaPrecioChicago",
                  "type": "uint256"
                },
                {
                  "internalType": "string",
                  "name": "incoterm",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "precioFinal",
                  "type": "uint256"
                }
              ],
              "internalType": "struct ContratoGranosSoja.CondicionesPrecio",
              "name": "condicionesPrecio",
              "type": "tuple"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "puertoEmbarque",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "destinoFinal",
                  "type": "string"
                }
              ],
              "internalType": "struct ContratoGranosSoja.CondicionesEmbarque",
              "name": "condicionesEmbarque",
              "type": "tuple"
            },
            {
              "internalType": "string",
              "name": "hashVersionContrato",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "evidenceURI",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "fechaCelebracionContrato",
              "type": "uint256"
            },
            {
              "internalType": "enum ContratoGranosSoja.Estado",
              "name": "estado",
              "type": "uint8"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "textoClausula",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "CID",
                  "type": "string"
                }
              ],
              "internalType": "struct ContratoGranosSoja.ClausulaAdicional[]",
              "name": "clausulasAdicionales",
              "type": "tuple[]"
            }
          ],
          "internalType": "struct ContratoGranosSoja.Contrato[]",
          "name": "",
          "type": "tuple[]"
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
      "inputs": [],
      "name": "relayer",
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
          "internalType": "address",
          "name": "_relayer",
          "type": "address"
        }
      ],
      "name": "setRelayer",
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
      "inputs": [],
      "name": "trustedForwarder",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
export const RPC_URL = "http://localhost:8545";