import { z } from "zod";

// Lista de códigos IATA para validación de origen y destino
const iataCodes: [string, ...string[]] = [
  "BOG",
  "MDE",
  "CTG",
  "ADZ",
  "AXM",
  "CLO",
  "CUC",
  "BAQ",
  "PEI",
  "SMR",
  "JFK",
  "LHR",
  "CDG",
  "SYD",
  "HND",
  "DXB",
  "SIN",
  "CAN",
  "MEX",
  "IST",
];

export const formFlight = z
  .object({
    flightNumber: z
      .string({ message: "El número de vuelo es requerido" })
      .regex(/^SA\d{3,4}$/, {
        message: "El número de vuelo debe tener el formato SA####",
      }),
    flightType: z.enum(["INTERNACIONAL", "NACIONAL"], {
      message: "El tipo de vuelo no es válido",
    }),
    departureCity: z.enum(iataCodes, {
      message: "El código de origen no es válido",
    }),
    destinationCity: z.enum(iataCodes, {
      message: "El código de destino no es válido",
    }),
    aircraftId: z.string({
      message: "El tipo de aeronave no es válido",
    }),
    departureDate: z.date({
      message: "La fecha de salida debe estar en formato YYYY-MM-DD",
    }),
    departureTime: z.string({
      message: "La hora de salida debe estar en formato HH:mm",
    }),
    arrivalDate: z.date({
      message: "La fecha de llegada debe estar en formato YYYY-MM-DD",
    }),
    arrivalTime: z.string({
      message: "La hora de llegada debe estar en formato HH:mm",
    }),
    price: z
      .number()
      .min(150000, { message: "El precio debe ser mayor o igual a 150000" })
      .max(10000000, {
        message: "El precio debe ser menor o igual a 10000000",
      }),
    taxPercentage: z
      .number()
      .min(1, { message: "El porcentaje de impuesto es requerido" }),
    surcharge: z
      .number()
      .min(1, { message: "El porcentaje de sobretasa es requerido" }),
  })
  .refine((data) => data.departureDate <= data.arrivalDate, {
    message: "La fecha de salida no puede ser después de la fecha de llegada",
    path: ["arrivalDate"], // Muestra el error en el campo de llegada
  })
  .refine(
    (data) => {
      if (data.departureDate.getTime() === data.arrivalDate.getTime()) {
        return data.departureTime < data.arrivalTime;
      }
      return true;
    },
    {
      message:
        "La hora de llegada debe ser después de la hora de salida si es el mismo día",
      path: ["arrivalTime"],
    }
  );

export type FlightSchema = z.infer<typeof formFlight>;
