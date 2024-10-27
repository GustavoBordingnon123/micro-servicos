"use client";

import { useState } from "react";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await fetch("api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    
    const data = await response.json();

    console.log(data);

    const responseText = data.message || data.error;

    alert(responseText)
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div
        className="bg-white w-fit p-4 flex flex-col gap-2 rounded-md"
      >
        <form 
          className="flex flex-col gap-2"
          onSubmit={handleSubmit}
        >
          <input
            placeholder="Email"
            className="border border-gray-300 p-2 rounded-md text-black"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            className="border border-gray-300 p-2 rounded-md text-black"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button 
            type="submit" 
            className="border border-gray-300 p-2 rounded-md text-black"
          >
            Login
          </button>
          <p
            className="text-black"
          >
            Não tem conta? <a href="/SignUp">Cadastre-se</a>
          </p>
        </form>
      </div>
    </div>
  );
}
