import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

function AdminInfo() {
  return (
    <>
      <Avatar className="bg-transparent">
        <AvatarImage src="/admin.png" alt="Imagen administrador" />
        <AvatarFallback>SA</AvatarFallback>
      </Avatar>

      <div className="flex flex-col items-start select-none">
        <span className="font-medium text-sm">Catalina Céspedes</span>
        <span className="text-xs text-orange-400">Administrador</span>
      </div>

      <Button size="icon" className="rounded-full h-10 w-10 bg-primary">
        <abbr title="Cerrar sesión">
          <LogOut />
        </abbr>
      </Button>
    </>
  );
}

export default AdminInfo;
