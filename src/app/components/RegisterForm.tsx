"use client";

// components/RegisterForm.tsx
import { useState } from "react";

export default function RegisterForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    alert(data.message || "Usuário registrado com sucesso");
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="bg-white w-fit p-4 flex flex-col gap-2 rounded-md">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <input
            placeholder="Nome"
            className="border border-gray-300 p-2 rounded-md text-black"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            placeholder="Email"
            className="border border-gray-300 p-2 rounded-md text-black"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            className="border border-gray-300 p-2 rounded-md text-black"
            placeholder="Senha"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            className="border border-gray-300 p-2 rounded-md text-black"
            type="submit"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}
