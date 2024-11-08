import Navbar from "@/components/molecules/bars/Navbar";
import FooterCopy from "@/components/molecules/FooterCopy";
import EditFlightForm from "@/components/molecules/forms/EditFlightForm";
import React from "react";

export default function EditFlightPage() {
  return (
    <div className="flex flex-col h-full w-full">
      <Navbar />
      <EditFlightForm />
      <FooterCopy />
    </div>
  );
}
