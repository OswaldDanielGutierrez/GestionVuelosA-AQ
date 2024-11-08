import { Button } from "@/components/ui/button";
import { DELETE_FLIGHT } from "@/graphql/mutations/flightMutations";
import { ALL_FLIGHTS } from "@/graphql/queries/flightQueries";
import { toast } from "@/hooks/use-toast";
import { FlightType } from "@/types/FlighTypes";
import { useMutation, useQuery } from "@apollo/client";
import { Pencil, X } from "lucide-react";
import FlightCardDetail from "./FlightCardDetail";
import { useRouter } from "next/router";

type FlightCardProps = {
  searchValue: string;
};

const FlightCard = ({ searchValue }: FlightCardProps) => {
  const { data } = useQuery<FlightType>(ALL_FLIGHTS);
  const flights = data?.getFlightsByFilters || [];
  const lowerSearchValue = searchValue.toLowerCase();
  const router = useRouter();

  // Mutación para eliminar un vuelo
  const [deleteFlight] = useMutation(DELETE_FLIGHT, {
    refetchQueries: [{ query: ALL_FLIGHTS }],
  });

  const handleDelete = (flightId: string) => {
    try {
      deleteFlight({ variables: { id: flightId } });
      toast({
        title: "Vuelo eliminado ✅",
        description: "El vuelo ha sido eliminado con éxito",
      });
    } catch (error) {
      toast({
        title: "Error al eliminar vuelo ❌",
        description: "Ha ocurrido un error al eliminar el vuelo.",
      });
    }
  };

  const handleEditFlight = (flightId: string) => {
    router.push(`/gestion-de-vuelos-A/vuelos/edit?flightId=${flightId}`);
  };

  // Filtrar los vuelos según el valor de búsqueda
  const filteredFlights = flights.filter(
    (flight) =>
      flight.flightNumber.toLowerCase().includes(lowerSearchValue) ||
      flight.departureCity.toLowerCase().includes(lowerSearchValue) ||
      flight.destinationCity.toLowerCase().includes(lowerSearchValue)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 px-4">
      {filteredFlights.map((flight) => (
        <div
          key={flight.id}
          className="w-full max-w-3xl border border-slate-300 shadow-lg rounded-lg p-6 flex flex-col gap-4"
        >
          {/* Tipo de vuelo en la esquina superior izquierda */}
          <div className="flex justify-between">
            <span className="text-sm font-semibold text-gray-500">
              Vuelo {flight.flightType.toLowerCase()}
            </span>
          </div>

          {/* Código del vuelo centrado */}
          <h2 className="text-2xl font-bold text-center">
            {flight.flightNumber}
          </h2>

          {/* Detalles divididos en dos columnas */}
          <div className="flex justify-between gap-8">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold">Origen</span>
              <span>{flight.departureCity}</span>
              <span className="text-sm font-semibold">Fecha de salida</span>
              <span>
                {flight.departureDate} - {flight.departureTime}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold">Destino</span>
              <span>{flight.destinationCity}</span>
              <span className="text-sm font-semibold">Fecha de llegada</span>
              <span>
                {flight.arrivalDate} - {flight.arrivalTime}
              </span>
            </div>
          </div>

          {/* Botones al final */}
          <div className="flex justify-end gap-2">
            <FlightCardDetail flight={flight} />
            <Button
              variant="default"
              className="flex gap-1 items-center justify-center"
              onClick={() => handleEditFlight(flight.id)}
            >
              <Pencil /> Editar
            </Button>
            <Button
              variant="destructive"
              className="flex gap-1 items-center justify-center"
              onClick={() => handleDelete(flight.id)}
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

export default FlightCard;
