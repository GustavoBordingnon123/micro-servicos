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
      <div className="bg-white w-fit p-8 flex flex-col gap-2 rounded-md border border-gray-500">
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <p>
            <span className="text-2xl text-black font-semibold w-full text-center">
              Crie sua conta!
            </span>
          </p>

          <div className="flex flex-col gap-2 my-2">
            <label className="text-black font-semibold">Nome:</label>
            <input
              placeholder="Nome"
              className="border border-gray-300 p-2 rounded-md text-black"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-2 my-2">
            <label className="text-black font-semibold">Email:</label>
            <input
              placeholder="Email"
              className="border border-gray-300 p-2 rounded-md text-black"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-2 my-2">
            <label className="text-black font-semibold">Senha:</label>
            <input
              type="password"
              className="border border-gray-300 p-2 rounded-md text-black"
              placeholder="Senha"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            className="border border-gray-300 p-2 rounded-md text-black my-2 hover:opacity-80"
            type="submit"
          >
            Registrar
          </button>
        </form>

        <p className="text-black">
          Já tem um conta?
          <a
            className="text-blue-400 cursor-pointer hover:text-blue-600 hover:underline"
            href="/SignIn"
          >
            {" "}
            Clique aqui para realizar o login
          </a>
        </p>
      </div>
    </div>
  );
}
