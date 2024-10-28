"use client"; // Necessário para componentes que usam hooks

import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [updateProduct, setUpdateProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    const response = await fetch("/api/products");
    const data = await response.json();
    setProducts(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (updateProduct) {
      await fetch("/api/products", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: updateProduct.id, name, price }),
      });
    } else {
      await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, price }),
      });
    }
    setName("");
    setPrice(0);
    setUpdateProduct(null);
    fetchProducts();
  };

  const handleEdit = (product: Product) => {
    setUpdateProduct(product);
    setName(product.name);
    setPrice(product.price);
  };

  const handleDelete = async (id: number) => {
    await fetch("/api/products", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="bg-white w-fit p-8 flex flex-col gap-4 rounded-md border border-gray-500">
        <p>
          <span className="text-2xl text-black font-semibold w-full text-center">
            Tabela de produtos!
          </span>
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Nome do Produto"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 border border-gray-300 rounded-md text-black"
            required
          />
          <input
            type="number"
            placeholder="Preço do Produto"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded-md text-black"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            {updateProduct ? "Atualizar Produto" : "Adicionar Produto"}
          </button>
        </form>

        <ul className="mt-4">
          {products.map((product) => (
            <li key={product.id} className="flex justify-between items-center border-b py-2 gap-4">
              <span className="text-black">{product.name} - R${product.price.toFixed(2)}</span>
              <div>
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
