// Campos del formulario de vuelos
export const flightFormFields = [
  {
    name: "flightType",
    label: "Tipo de vuelo",
    type: "select",
    options: ["economico", "internacional", "nacional"],
  },
  {
    name: "aircraft",
    label: "Seleccionar Aeronave",
    type: "select",
    options: ["Boeing", "Airbus"],
  },
  { name: "passengers", label: "Número de pasajeros", type: "number" },
  { name: "price", label: "Precio", type: "text" },
  { name: "tax", label: "Impuesto", type: "number" },
  { name: "surcharge", label: "Sobretasa", type: "number" },
  { name: "origin", label: "Origen", type: "text" },
  { name: "departureDate", label: "Fecha de salida", type: "date" },
  { name: "departureTime", label: "Hora de salida", type: "time" },
  { name: "destination", label: "Destino", type: "text" },
  { name: "arrivalDate", label: "Fecha de llegada", type: "date" },
  { name: "arrivalTime", label: "Hora de llegada", type: "time" },
];
