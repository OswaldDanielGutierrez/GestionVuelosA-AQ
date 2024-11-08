import AdminInfo from "@/components/molecules/AdminInfo";
import FooterCopy from "@/components/molecules/FooterCopy";
import { Button } from "@/components/ui/button";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function HomePage() {
  return (
    <main className="h-screen bg-gradient-to-b from-slate-400 to-slate-900 to-95% font-sans text-white flex flex-col justify-between">
      <Head>
        <title>Gestión de vuelos A</title>
      </Head>
      <header className="flex justify-end gap-4 items-center p-4">
        <AdminInfo />
      </header>

      <div className="flex flex-col items-center justify-center gap-6">
        <figure className="w-full h-64 flex justify-center">
          <Image
            src="/avion-logo.png"
            height={200}
            width={800}
            alt="Logo de UdeAirlines"
            className="object-contain"
            sizes="100%"
            priority
          />
        </figure>
        <h4 className="text-xl font-semibold select-none">
          Gestión de vuelos A
        </h4>
        <div className="flex gap-8">
          <Link href="/gestion-de-vuelos-A/vuelos">
            <Button className="w-36">Vuelos</Button>
          </Link>
          <Link href="/gestion-de-vuelos-A/aeronaves">
            <Button className="w-36">Aeronaves</Button>
          </Link>
        </div>
      </div>

      <FooterCopy />
    </main>
  );
}

export default HomePage;
