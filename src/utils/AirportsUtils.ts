export const colombiaAirports = [
  { code: "BOG", name: "El Dorado - Bogotá" },
  { code: "MDE", name: "José María Córdova - Medellín" },
  { code: "CTG", name: "Rafael Núñez - Cartagena" },
  { code: "ADZ", name: "Gustavo Rojas Pinilla - San Andrés" },
  { code: "AXM", name: "El Edén - Armenia" },
  { code: "CLO", name: "Alfonso Bonilla Aragón - Cali" },
  { code: "CUC", name: "Camilo Daza - Cúcuta" },
  { code: "BAQ", name: "Ernesto Cortissoz - Barranquilla" },
  { code: "PEI", name: "Matecaña - Pereira" },
  { code: "SMR", name: "Simón Bolívar - Santa Marta" },
];

export const internationalAirports = [
  { code: "JFK", name: "John F. Kennedy - Nueva York" },
  { code: "LHR", name: "Aeropuerto de Heathrow - Londres" },
  { code: "CDG", name: "Charles de Gaulle - París" },
  { code: "SYD", name: "Kingsford Smith - Sídney" },
  { code: "HND", name: "Aeropuerto de Haneda - Tokio" },
  { code: "DXB", name: "Aeropuerto de Dubái" },
  { code: "SIN", name: "Aeropuerto Changi - Singapur" },
  { code: "CAN", name: "Cantón-Baiyun - Cantón" },
  { code: "MEX", name: "Benito Juárez - Ciudad de México" },
  { code: "IST", name: "Aeropuerto de Estambul" },
];

// Función para obtener las ciudades de origen según el tipo de vuelo
export const getAirports = (
  flightType: "NACIONAL" | "INTERNACIONAL",
  departureCity?: string
) => {
  if (flightType === "NACIONAL") {
    return colombiaAirports;
  }

  if (
    flightType === "INTERNACIONAL" &&
    departureCity &&
    colombiaAirports.some((a) => a.code === departureCity)
  ) {
    // Si el vuelo es internacional y el origen es colombiano, solo mostrar aeropuertos internacionales
    return internationalAirports;
  }

  // Si el vuelo es internacional y el origen no es colombiano, mostrar todos
  return [...colombiaAirports, ...internationalAirports];
};
