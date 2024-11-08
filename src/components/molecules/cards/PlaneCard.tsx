import { Button } from "@/components/ui/button";
import { CircleEllipsis, Pencil, X } from "lucide-react";
import React from "react";

const PlaneCard = () => {
  const planes = [
    {
      code: "SA-1234",
      aircraft: "Airbus",
      airplaneModel: "A320-300",
      seating: "150",
      layout: "2-2-2",
    },
    {
      code: "SA-1824",
      aircraft: "Airbus",
      airplaneModel: "A320-300",
      seating: "125",
      layout: "2-4-2",
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-6 py-8 px-4">
      {planes.map((planes, index) => (
        <div
          key={index}
          className="w-full max-w-3xl bg-green-50 border border-slate-300 shadow-lg rounded-lg p-6 flex flex-col gap-4 mx-auto border-l-4 border-green-500"
        >


          {/* Código del vuelo centrado */}
          <h2 className="text-2xl font-bold text-center">
            {planes.code}
          </h2>

          {/* Detalles divididos en dos columnas */}
          <div className="flex justify-between gap-8">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold">Tipo de Aeronave: <span className="text-sm font-normal">{planes.aircraft} {planes.airplaneModel}</span></span>
              
              <span className="text-sm font-bold">Distribución: <span className="text-sm font-normal">{planes.layout} </span> </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold">Capacidad de Pasajeros: <span className="text-sm font-normal">{planes.seating} </span></span>
            </div>
          </div>

          {/* Botones al final */}
          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              className="flex gap-1 items-center justify-center"
            >
              <CircleEllipsis />
              Ver más
            </Button>
            <Button
              variant="default"
              className="flex gap-1 items-center justify-center"
            >
              <Pencil /> Editar
            </Button>
            <Button
              variant="destructive"
              className="flex gap-1 items-center justify-center"
            >
              <X />
              Eliminar
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlaneCard;
