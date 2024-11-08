import Navbar from "@/components/molecules/bars/Navbar";
import SearchBar from "@/components/molecules/bars/planes/SearchBar";
import PlaneCard from "@/components/molecules/cards/PlaneCard";

function PlaneHome() {
    return (
        <div className="flex flex-col h-full w-full">
            <Navbar />
            <SearchBar />
            <PlaneCard />
        </div>
    );
}

export default PlaneHome;