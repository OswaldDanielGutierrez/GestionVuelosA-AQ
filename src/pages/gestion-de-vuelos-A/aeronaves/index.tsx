import React from "react";
import Navbar from "@/components/molecules/bars/Navbar";
import FooterCopy from "@/components/molecules/FooterCopy";
import PlaneForm from "@/components/molecules/forms/PlaneForm";

function AeronavesPage() {
  return (
    <div className="flex flex-col h-full w-full">
      <Navbar />
      <PlaneForm  />
      <FooterCopy />
    </div>
  );
}

export default AeronavesPage;
