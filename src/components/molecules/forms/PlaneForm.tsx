import React from "react";
import { Button } from "@/components/ui/button";
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
import { PlaneSchema, formPlane } from "@/schemas/PlaneSchema";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import Link from "next/link";
import { BadgePlus } from "lucide-react";

function PlaneForm() {
  const form = useForm<PlaneSchema>({
    resolver: zodResolver(formPlane),
  });

  function onSubmit(data: PlaneSchema) {
    console.log(data);
    form.reset();
  }

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-4xl font-extrabold text-center mt-12">
        Ingresar información de la Aeronave
      </h3>

      <hr className="border-t-1 border-gray-300 w-1/2 my-5" />

      <div className="w-auto text-right ml-auto mr-10">
        <Link
          href="/gestion-de-vuelos-A/aeronaves/consulta"
          className="flex gap-1 bg-primary hover:bg-primary/90 transition-colors duration-200 text-slate-100 font-bold p-2 rounded-lg"
        >
          <BadgePlus /> Consultar Aerovanes
        </Link>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row items-center justify-center gap-4 py-6"
        >
          {/* Contenedor para alinear los campos */}
          <div className="flex flex-row gap-4">
            {/* Número de serie */}
            <FormField
              control={form.control}
              name="serialNumber"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Familia de Aeronave</FormLabel>
                  <FormControl>
                    <Input
                      className="w-64 h-[45px] text-base"
                      value={field.value || ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Modelo */}
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Modelo de Aeronave</FormLabel>

                  <FormControl>
                    <Input
                      placeholder=""
                      className="w-64 h-[45px] text-base"
                      value={field.value || ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Capacidad */}
            <FormField
              control={form.control}
              name="capacity"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Capacidad de Pasajeros</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder=""
                      className="w-64 h-[45px] text-base"
                      value={field.value || ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>

      <hr className="border-t-1 border-gray-300 w-1/2 my-10" />

      {/*----------------------------------------------------------------------------------------------------------*/}

      <h3 className="text-1xl font-extrabold text-center my-4">
        Selección de Distribución
      </h3>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row items-center justify-center gap-4 py-6"
        >
          <div className="flex flex-row gap-4">
            {/* DISTRIBUCION 1 */}
            <FormField
              control={form.control}
              name="distribution"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <div className="flex flex-col items-center">
                    <Image
                      src="/distribucion1.png"
                      alt="Distribución 1"
                      width={300}
                      height={300}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        field.onChange({ target: { value: "distribucion1" } })
                      }
                      className={`mt-2 w-6 h-6 rounded-full border-2 ${
                        field.value === "distribucion1"
                          ? "bg-green-500 border-black-500"
                          : "bg-white border-gray-300"
                      } flex items-center justify-center`}
                    >
                      {field.value === "distribucion1" ? (
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : null}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* DISTRIBUCION 2 */}
            <FormField
              control={form.control}
              name="distribution"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <div className="flex flex-col items-center">
                    <Image
                      src="/distribucion2.png"
                      alt="Distribución 2"
                      width={300}
                      height={300}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        field.onChange({ target: { value: "distribucion2" } })
                      }
                      className={`mt-2 w-6 h-6 rounded-full border-2 ${
                        field.value === "distribucion2"
                          ? "bg-green-500 border-black-500"
                          : "bg-white border-gray-300"
                      } flex items-center justify-center`}
                    >
                      {field.value === "distribucion2" ? (
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : null}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* DISTRIBUCION 3 */}
            <FormField
              control={form.control}
              name="distribution"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <div className="flex flex-col items-center">
                    <Image
                      src="/distribucion3.png"
                      alt="Distribución 3"
                      width={300}
                      height={300}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        field.onChange({ target: { value: "distribucion3" } })
                      }
                      className={`mt-2 w-6 h-6 rounded-full border-2 ${
                        field.value === "distribucion3"
                          ? "bg-green-500 border-black-500"
                          : "bg-white border-gray-300"
                      } flex items-center justify-center`}
                    >
                      {field.value === "distribucion3" ? (
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      ) : null}
                    </button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>

      {/*------------------------------------FIN----------------------------------------------------------------------*/}

      {/* Botón para registrar avión */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            type="submit"
            className="mt-4  text-white border border-green-500 rounded-md px-4 py-2 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Registrar Aerovane
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¡Avión registrado!</AlertDialogTitle>
            <AlertDialogDescription>
              El avión ha sido registrado exitosamente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default PlaneForm;
