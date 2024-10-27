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

    if (response.ok) {
      localStorage.setItem("token", data.token);
      alert("Login realizado com sucesso!");
      window.location.href = "/home";
      return;
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-fit p-8 flex flex-col gap-2 rounded-md border border-gray-500">
        <form className="flex flex-col gap-2 w-full " onSubmit={handleSubmit}>
          <p>
            <span className="text-2xl text-black font-semibold w-full text-center">
              Realize seu Login!
            </span>
          </p>

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
              placeholder="Senha"
              className="border border-gray-300 p-2 rounded-md text-black"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="border border-gray-300 p-2 rounded-md text-black my-2 hover:opacity-80"
          >
            Login
          </button>
          <p className="text-black">
            Não tem conta?
            <a
              className="text-blue-400 cursor-pointer hover:text-blue-600 hover:underline"
              href="/SignUp"
            >
              {" "}
              Cadastre-se
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
