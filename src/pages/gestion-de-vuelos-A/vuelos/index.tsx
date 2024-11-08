import Navbar from "@/components/molecules/bars/Navbar";
import SearchBar from "@/components/molecules/bars/SearchBar";
import FlightCard from "@/components/molecules/cards/FlightCard";
import FooterCopy from "@/components/molecules/FooterCopy";
import { BadgePlus } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";

function FlightsHome() {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = () => {
    // En este caso, solo actualiza el estado. React se encargará de renderizar de nuevo.
    setSearchValue("searchValue");
  };
  return (
    <div className="flex flex-col h-full w-full">
      <Head>
        <title>Vuelos página principal | Gestión de vuelos A</title>
      </Head>
      <Navbar />
      <SearchBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSearch={handleSearch}
      />
      <section className="flex flex-col">
        <div className="flex justify-end px-4">
          <Link
            href="/gestion-de-vuelos-A/vuelos/registro"
            className="flex gap-1 bg-primary hover:bg-primary/90 transition-colors duration-200 text-slate-100 font-bold p-2 rounded-lg"
          >
            <BadgePlus /> Registrar vuelo
          </Link>
        </div>
        <FlightCard searchValue={searchValue} />
      </section>
      <FooterCopy />
    </div>
  );
}

export default FlightsHome;
