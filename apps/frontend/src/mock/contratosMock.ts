export const contratosMock = [
  {
    id: 1,
    billeteraComprador: "0x1111111111111111111111111111111111111111",
    billeteraVendedor: "0x2222222222222222222222222222222222222222",
    billeteraBroker: "0x0000000000000000000000000000000000000000",

    nombreComprador: "AgroExport S.A.",
    nombreVendedor: "Campos del Sur SRL",
    nombreBroker: "—",
    nroFiscalComprador: "80012345-6",
    nroFiscalVendedor: "90054321-9",
    nroFiscalBroker: "",

    emailComprador: "comprador1@mail.com",
    telefonoComprador: "+59599111111",
    emailVendedor: "vendedor1@mail.com",
    telefonoVendedor: "+59599222222",

    cantidadToneladas: 500,
    tipoGrano: "Soja",
    cosecha: "2025",

    empaque: "A Granel",
    fechaEntregaInicio: new Date(2025, 3, 1),
    fechaEntregaFin: new Date(2025, 3, 30),

    tipoContrato: "Precio Fijo",
    precioPorToneladaMetrica: 320,
    precioCBOTBushel: 0,
    ajusteCBOT: 0,
    fechaPrecioChicago: Date.now() / 1000,
    incoterm: "FOB",
    precioFinal: 320,

    puertoEmbarque: "Puerto Rosario",
    destinoFinal: "Rotterdam",

    hashVersionContrato: "hash_v1",
    evidenceURI: "ipfs://mock/1",
    fechaCelebracionContrato: new Date(),
    estado: "Enviado",

    clausulasAdicionales: [
      { textoClausula: "Muestra requerida al embarque", CID: "QmMock123" }
    ]
  },
  {
    id: 2,
    billeteraComprador: "0x3333333333333333333333333333333333333333",
    billeteraVendedor: "0x4444444444444444444444444444444444444444",
    billeteraBroker: "0x5555555555555555555555555555555555555555",

    nombreComprador: "Compañía Granelera",
    nombreVendedor: "AgroPar S.A.",
    nombreBroker: "Broker Latam",
    nroFiscalComprador: "90123456-7",
    nroFiscalVendedor: "70033333-8",
    nroFiscalBroker: "60022222-1",

    emailComprador: "comprador2@mail.com",
    telefonoComprador: "+59599123456",
    emailVendedor: "vendedor2@mail.com",
    telefonoVendedor: "+59599444555",

    cantidadToneladas: 800,
    tipoGrano: "Soja",
    cosecha: "2024",

    empaque: "Big Bag",
    fechaEntregaInicio: new Date(2025, 4, 15),
    fechaEntregaFin: new Date(2025, 5, 15),

    tipoContrato: "Precio a Fijar",
    precioPorToneladaMetrica: 0,
    precioCBOTBushel: 1290,
    ajusteCBOT: -5,
    fechaPrecioChicago: Date.now() / 1000,
    incoterm: "CIF",
    precioFinal: 450,

    puertoEmbarque: "Buenos Aires",
    destinoFinal: "Hamburgo",

    hashVersionContrato: "hash_v1",
    evidenceURI: "ipfs://mock/2",
    fechaCelebracionContrato: new Date(),
    estado: "Borrador",

    clausulasAdicionales: []
  }
];

// 👉 Agregamos otros 8 automáticamente:
for (let i = 3; i <= 10; i++) {
  contratosMock.push({
    id: i,
    billeteraComprador: `0x${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}${i}`,
    billeteraVendedor: `0x${i + 10}${i + 10}${i + 10}${i + 10}${i + 10}${i + 10}${i + 10}${i + 10}${i + 10}${i + 10}${i + 10}${i + 10}${i + 10}${i + 10}${i + 10}${i + 10}`,
    billeteraBroker: "0x0000000000000000000000000000000000000000",

    nombreComprador: `Comprador Test ${i}`,
    nombreVendedor: `Vendedor Test ${i}`,
    nombreBroker: "",

    nroFiscalComprador: `8000000${i}`,
    nroFiscalVendedor: `9000000${i}`,
    nroFiscalBroker: "",

    emailComprador: `comprador${i}@mail.com`,
    telefonoComprador: "+59599111222",
    emailVendedor: `vendedor${i}@mail.com`,
    telefonoVendedor: "+59599333444",

    cantidadToneladas: 100 * i,
    tipoGrano: "Soja",
    cosecha: "2025",

    empaque: "A Granel",
    fechaEntregaInicio: new Date(2025, 2, 1),
    fechaEntregaFin: new Date(2025, 2, 28),

    tipoContrato: i % 2 === 0 ? "Precio Fijo" : "Precio a Fijar",
    precioPorToneladaMetrica: 300 + i,
    precioCBOTBushel: 1200 + i,
    ajusteCBOT: 0,
    fechaPrecioChicago: Date.now() / 1000,
    incoterm: "FOB",
    precioFinal: 300 + i,

    puertoEmbarque: "Rosario",
    destinoFinal: "Shanghai",

    hashVersionContrato: `hash_mock_${i}`,
    evidenceURI: `ipfs://mock/${i}`,
    fechaCelebracionContrato: new Date(),
    estado: i % 2 === 0 ? "Firmado" : "Enviado",

    clausulasAdicionales: []
  });
}
