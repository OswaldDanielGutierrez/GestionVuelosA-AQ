import React from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";

type SearchBarProps = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  handleSearch: () => void;
};

function SearchBar({
  searchValue,
  setSearchValue,
  handleSearch,
}: SearchBarProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="flex justify-center gap-2 w-full max-w-lg">
        <div className="relative w-full my-8">
          <span className="absolute top-1 left-0 flex items-center pl-3">
            <Search className="text-slate-400" />
          </span>
          <Input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Buscar vuelo..."
            id="search"
            className="pl-10"
          />
          <Label htmlFor="search" className="text-slate-400 mt-1 block pl-4">
            Búsqueda por código de vuelo
          </Label>
        </div>
        <Button type="button" className="my-8" onClick={handleSearch}>
          Filtrar
        </Button>
      </div>
      <Separator className="w-full max-w-2xl" />
    </div>
  );
}

export default SearchBar;
