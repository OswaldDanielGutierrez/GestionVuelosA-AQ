import React from "react";
import AdminInfo from "@/components/molecules/AdminInfo";
import Link from "next/link";
import Logo from "@/components/molecules/Logo";

function Navbar() {
  const navigationOptions = [
    {
      name: "Inicio",
      path: "/gestion-de-vuelos-A",
      isActive: false,
    },
    {
      name: "Vuelos",
      path: "/gestion-de-vuelos-A/vuelos",
      isActive: false,
    },
    {
      name: "Aeronaves",
      path: "/gestion-de-vuelos-A/aeronaves",
      isActive: false,
    },
  ];

  return (
    <nav className="flex justify-between items-center gap-4 border-b-2 border-gray-500 px-4 py-1 w-full h-full">
      <div className="flex flex-row justify-center items-center gap-2 py-2">
        <Logo />
      </div>
      <div className=" flex items-center justify-center gap-8">
        {navigationOptions.map((option, index) => (
          <span
            className="text-center py-2 w-24 text-slate-900 border-b-2 border-transparent hover:border-primary duration-300 text-base font-medium"
            key={index}
          >
            <Link href={option.path}>{option.name}</Link>
          </span>
        ))}
      </div>
      <div className="flex gap-4">
        <AdminInfo />
      </div>
    </nav>
  );
}

export default Navbar;
