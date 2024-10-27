"use client"; // Necessário para componentes que usam hooks

import { useEffect } from "react";

export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="bg-white w-fit p-8 flex flex-col gap-2 rounded-md border border-gray-500">
        <p>
          <span className="text-2xl text-black font-semibold w-full text-center">
            Bem vindo ao sistema!
          </span>
        </p>
      </div>
    </div>
  );
}
