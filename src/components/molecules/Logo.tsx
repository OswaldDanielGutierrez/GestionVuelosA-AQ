import Image from "next/image";
import React from "react";

function Logo() {
  return (
    <>
      <Image
        src="/avion.png"
        width={200}
        height={80}
        sizes="100%"
        className="object-contain"
        alt="Logo de la página"
        priority
      />
    </>
  );
}

export default Logo;
