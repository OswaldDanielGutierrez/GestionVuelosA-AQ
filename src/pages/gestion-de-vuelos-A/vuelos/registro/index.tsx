import FooterCopy from "@/components/molecules/FooterCopy";
import FlightForm from "@/components/molecules/forms/FlightForm";
import Navbar from "@/components/molecules/bars/Navbar";

function FlightsPage() {
  return (
    <div className="flex flex-col h-full w-full">
      <Navbar />
      <FlightForm />
      <FooterCopy />
    </div>
  );
}

export default FlightsPage;
