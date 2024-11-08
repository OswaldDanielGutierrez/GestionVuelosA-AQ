import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FlightSchema, formFlight } from "@/schemas/FlightSchema";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarClock, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TimePicker } from "@/components/ui/time-picker/time-picker";
import { gql, useMutation, useQuery } from "@apollo/client";
import { UPDATE_FLIGHT } from "@/graphql/mutations/flightMutations";
import Head from "next/head";
import {
  colombiaAirports,
  getAirports,
  internationalAirports,
} from "@/utils/AirportsUtils";
import { useRouter } from "next/router";
import { FLIGHT_BY_ID } from "@/graphql/queries/flightQueries";

export interface Aircraft {
  id: string;
  aircraftModel: string;
}

export const GET_AIRCRAFTS = gql`
  query GetAircrafts {
    getAircraftsByFilters {
      id
      aircraftModel
    }
  }
`;

export const GET_AIRCRAFT_BY_ID = gql`
  query GetAircraftById($id: ID!) {
    aircraftById(id: $id) {
      aircraftModel
    }
  }
`;

type AircraftType = {
  getAircraftsByFilters: Aircraft[];
};

function EditFlightForm() {
  const router = useRouter();
  const { flightId } = router.query; // Obtener el ID del vuelo de los parámetros de la URL
  const { data: aircraftData } = useQuery<AircraftType>(GET_AIRCRAFTS);
  const { data: aircraftFlight } = useQuery<Aircraft>(GET_AIRCRAFT_BY_ID);
  const { data: flightData } = useQuery(FLIGHT_BY_ID, {
    variables: { id: flightId },
    skip: !flightId, // Evita la consulta si no hay flightId
  });

  // Estado para controlar el diálogo de alerta
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertTitle, setAlertTitle] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [availableDestinations, setAvailableDestinations] = useState(
    internationalAirports
  );

  // Utilizamos el hook useForm para manejar el formulario
  const form = useForm<FlightSchema>({
    resolver: zodResolver(formFlight),
    defaultValues: {
      flightNumber: "",
      flightType: undefined,
      aircraftId: "",
      price: 0,
      taxPercentage: 0,
      surcharge: 0,
      departureCity: "",
      departureDate: undefined,
      departureTime: undefined,
      destinationCity: "",
      arrivalDate: undefined,
      arrivalTime: undefined,
    },
  });

  // Función para observar el tipo de vuelo para cambiar las opciones de origen y destino
  const { watch } = form;
  const flightType = watch("flightType");
  const departureCity = watch("departureCity");

  useEffect(() => {
    const airports = getAirports(flightType, departureCity);
    setAvailableDestinations(airports);
  }, [flightType, departureCity]);

  useEffect(() => {
    // Verifica si los datos del vuelo existen y si han sido cargados
    if (flightData?.flightById) {
      // Resetea los valores del formulario con los datos del vuelo
      form.reset({
        flightNumber: flightData.flightById.flightNumber || "",
        flightType: flightData.flightById.flightType || undefined,
        aircraftId: flightData.flightById.aircraftId || "",
        price: flightData.flightById.price || 0,
        taxPercentage: flightData.flightById.taxPercentage || 0,
        surcharge: flightData.flightById.surcharge || 0,
        departureCity: flightData.flightById.departureCity || "",
        departureDate: flightData.flightById.departureDate || undefined,
        departureTime: undefined,
        destinationCity: flightData.flightById.destinationCity || "",
        arrivalDate: flightData.flightById.arrivalDate || undefined,
        arrivalTime: undefined,
      });
    }
  }, [flightData, form]);

  // Función para cargar los datos del vuelo existente
  useEffect(() => {
    if (flightData && flightData.getFlightById) {
      form.reset(flightData.getFlightById);
    }
  }, [flightData, form]);

  // Función para enviar los datos del formulario
  const [updateFlight] = useMutation(UPDATE_FLIGHT);

  // Función para enviar los datos del formulario
  async function onSubmit(data: FlightSchema) {
    const formattedData = {
      ...data,
      departureDate: data.departureDate
        ? format(new Date(data.departureDate), "yyyy-MM-dd")
        : undefined,
      arrivalDate: data.arrivalDate
        ? format(new Date(data.arrivalDate), "yyyy-MM-dd")
        : undefined,
      departureTime: data.departureTime
        ? format(new Date(data.departureTime), "HH:mm")
        : undefined,
      arrivalTime: data.arrivalTime
        ? format(new Date(data.arrivalTime), "HH:mm")
        : undefined,
    };

    try {
      await updateFlight({
        variables: { id: flightId, input: formattedData },
      });
      setAlertTitle("¡Éxito!");
      setAlertMessage(`El vuelo ha sido actualizado exitosamente.`);
      setAlertType("success");
    } catch (error) {
      setAlertTitle("Error");
      setAlertMessage("Hubo un problema al actualizar el vuelo.");
      setAlertType("error");
    }

    setIsDialogOpen(true);
  }

  return (
    <div className="h-full">
      <Head>
        <title>Registrar vuelo | Gestión de vuelos A</title>
      </Head>
      <h1 className="text-5xl font-extrabold text-center my-4 text-gray-800">
        Ingresar información del vuelo
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 py-6 w-full justify-center items-center"
        >
          {/* Número del vuelo */}
          <FormField
            control={form.control}
            name="flightNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número del vuelo</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="SA666"
                    value={field.value}
                    onChange={field.onChange}
                    disabled={true}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tipo de vuelo */}
          <FormField
            control={form.control}
            name="flightType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de vuelo</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Tipo de vuelo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="INTERNACIONAL">Internacional</SelectItem>
                    <SelectItem value="NACIONAL">Nacional</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Aeronaves disponibles */}
          <FormField
            control={form.control}
            name="aircraftId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Aeronave</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione una aeronave" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {aircraftFlight && (
                      <SelectItem value={aircraftFlight?.aircraftModel}>
                        {aircraftFlight?.aircraftModel}
                      </SelectItem>
                    )}
                    {aircraftData?.getAircraftsByFilters.map((aircraft) => (
                      <SelectItem key={aircraft.id} value={aircraft.id}>
                        {aircraft.aircraftModel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Precio */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio</FormLabel>
                <FormControl>
                  <Input
                    placeholder="$ Precio"
                    type="number"
                    value={field.value || ""}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Impuesto */}
          <FormField
            control={form.control}
            name="taxPercentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>% Impuesto</FormLabel>
                <FormControl>
                  <Input
                    placeholder="% Impuesto"
                    pattern="[0-9]+"
                    value={field.value || ""}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Sobretasa */}
          <FormField
            control={form.control}
            name="surcharge"
            render={({ field }) => (
              <FormItem>
                <FormLabel>% Sobretasa</FormLabel>
                <FormControl>
                  <Input
                    placeholder="% Sobretasa"
                    pattern="[0-9]+"
                    value={field.value || ""}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo de Origen */}
          <FormField
            control={form.control}
            name="departureCity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Origen</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un origen" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {colombiaAirports.map((airport) => (
                      <SelectItem key={airport.code} value={airport.code}>
                        {airport.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Fecha de salida */}
          <FormField
            control={form.control}
            name="departureDate"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>Fecha de salida</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(!field.value && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                        {field.value ? (
                          format(new Date(field.value), "yyyy-MM-dd")
                        ) : (
                          <span>Seleccione una fecha</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Hora de salida */}
          <FormField
            control={form.control}
            name="departureTime"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Hora de salida</FormLabel>
                <Popover>
                  <FormControl>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(!field.value && "text-muted-foreground")}
                      >
                        <CalendarClock className="mr-2 h-4 w-4" />
                        {field.value &&
                        !isNaN(new Date(field.value).getTime()) ? (
                          format(new Date(field.value), "HH:mm")
                        ) : (
                          <span>Escribe la hora</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                  </FormControl>
                  <PopoverContent className="w-auto p-0">
                    <div className="p-3 border-t border-border">
                      <TimePicker
                        setDate={(date) =>
                          field.onChange(date ? date.toISOString() : undefined)
                        }
                        date={field.value ? new Date(field.value) : undefined}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo de Destino */}
          <FormField
            control={form.control}
            name="destinationCity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Destino</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un destino" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableDestinations.map((airport) => (
                      <SelectItem key={airport.code} value={airport.code}>
                        {airport.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Fecha de llegada */}
          <FormField
            control={form.control}
            name="arrivalDate"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>Fecha de llegada</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(!field.value && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                        {field.value ? (
                          format(new Date(field.value), "yyyy-MM-dd")
                        ) : (
                          <span>Seleccione una fecha</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Hora de llegada */}
          <FormField
            control={form.control}
            name="arrivalTime"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Hora de llegada</FormLabel>
                <Popover>
                  <FormControl>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(!field.value && "text-muted-foreground")}
                      >
                        <CalendarClock className="mr-2 h-4 w-4" />
                        {field.value &&
                        !isNaN(new Date(field.value).getTime()) ? (
                          format(new Date(field.value), "HH:mm")
                        ) : (
                          <span>Escribe la hora</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                  </FormControl>
                  <PopoverContent className="w-auto p-0">
                    <div className="p-3 border-t border-border">
                      <TimePicker
                        setDate={(date) =>
                          field.onChange(date ? date.toISOString() : undefined)
                        }
                        date={field.value ? new Date(field.value) : undefined}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="col-start-2 flex justify-center items-center">
            <Button type="submit" className="text-base">
              Actualizar vuelo
            </Button>
          </div>
        </form>
      </Form>

      {/* Dialogo de Alerta */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="rounded-md shadow-lg p-6 bg-white text-center">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold">
              {alertTitle}
            </AlertDialogTitle>
            <AlertDialogDescription
              className={`text-gray-600 ${
                alertType === "error"
                  ? "text-destructive text-base font-bold"
                  : "text-primary"
              }`}
            >
              {alertMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              className={`px-4 py-2 rounded-md ${
                alertType === "error"
                  ? "bg-destructive hover:bg-destructive/85"
                  : "bg-primary"
              } text-slate-100`}
              onClick={() => setIsDialogOpen(false)}
            >
              Continuar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default EditFlightForm;
