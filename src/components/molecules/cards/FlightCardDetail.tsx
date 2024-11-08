import React from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { CircleEllipsis } from "lucide-react";
import { Flight } from "@/types/FlighTypes";

type FlightDetailsDialogProps = {
  flight: Flight;
};

const FlightCardDetail = ({ flight }: FlightDetailsDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="secondary"
          className="flex gap-1 items-center justify-center"
        >
          <CircleEllipsis />
          Ver más
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-md shadow-lg p-6 bg-white text-center">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold">
            Detalles del Vuelo {flight.flightNumber}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 mt-4">
            <div className="grid grid-cols-2 gap-6 text-left text-lg">
              <div>
                <p className="flex flex-col">
                  <strong>Origen</strong>
                  <span>{flight.departureCity}</span>
                </p>
                <p className="flex flex-col">
                  <strong>Fecha de salida</strong>
                  <span>
                    {flight.departureDate} - {flight.departureTime}
                  </span>
                </p>
                <p className="flex flex-col">
                  <strong>Aeronave</strong>
                  {flight.aircraftId}
                </p>
                <p className="flex flex-col">
                  <strong>Porcentaje de impuestos</strong>
                  <span>{flight.taxPercentage}%</span>
                </p>
              </div>
              <div>
                <p className="flex flex-col">
                  <strong>Destino</strong>
                  <span>{flight.destinationCity}</span>
                </p>
                <p className="flex flex-col">
                  <strong>Fecha de llegada</strong>
                  <span>
                    {flight.arrivalDate} - {flight.arrivalTime}
                  </span>
                </p>
                <p className="flex flex-col">
                  <strong>Precio</strong>
                  <span>${flight.price}</span>
                </p>
                <p className="flex flex-col">
                  <strong>Recargo</strong>
                  <span>${flight.surcharge}</span>
                </p>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="bg-green-500 text-white px-4 py-2 rounded-md">
            Cerrar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FlightCardDetail;
