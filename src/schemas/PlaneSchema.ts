import { z } from "zod";

export const formPlane = z.object({
  model: z.string().min(1, "Modelo requerido"),
  registration: z.string().min(1, "Registro requerido"),
  manufacturer: z.string().min(1, "Fabricante requerido"),
  capacity: z.number().positive("Capacidad debe ser mayor que 0"),
  serialNumber: z.string().min(1, "Número de serie requerido"),
  manufactureYear: z.number().min(1900, "Año de fabricación debe ser mayor que 1900"), // Año de fabricación
  airline: z.string().min(1, "Aerolínea requerida"), // Agregar el campo airline
  distribution: z.string().min(1, "Distribución requerida") // Puedes agregar más reglas si es necesario
});

export type PlaneSchema = z.infer<typeof formPlane>;
