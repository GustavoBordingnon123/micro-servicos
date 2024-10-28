"use client"; // Necessário para componentes que usam hooks

import { useEffect, useState } from "react";

interface Order {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [userId, setUserId] = useState(0);
  const [productId, setProductId] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [updateOrder, setUpdateOrder] = useState<Order | null>(null);

  const fetchOrders = async () => {
    const response = await fetch("/api/orders");
    const data = await response.json();
    setOrders(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (updateOrder) {
      await fetch("/api/orders", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: updateOrder.id, userId, productId, quantity }),
      });
    } else {
      await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, productId, quantity }),
      });
    }
    setUserId(0);
    setProductId(0);
    setQuantity(0);
    setUpdateOrder(null);
    fetchOrders();
  };

  const handleEdit = (order: Order) => {
    setUpdateOrder(order);
    setUserId(order.userId);
    setProductId(order.productId);
    setQuantity(order.quantity);
  };

  const handleDelete = async (id: number) => {
    await fetch("/api/orders", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="bg-white w-fit p-8 flex flex-col gap-4 rounded-md border border-gray-500">
        <p>
          <span className="text-2xl text-black font-semibold w-full text-center">
            Gerenciar Pedidos
          </span>
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="number"
            placeholder="ID do Usuário"
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="number"
            placeholder="ID do Produto"
            value={productId}
            onChange={(e) => setProductId(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="number"
            placeholder="Quantidade"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="p-2 border border-gray-300 rounded-md"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            {updateOrder ? "Atualizar Pedido" : "Adicionar Pedido"}
          </button>
        </form>

        <ul className="mt-4">
          {orders.map((order) => (
            <li key={order.id} className="flex justify-between items-center border-b py-2">
              <span>
                Pedido #{order.id}: Usuário {order.userId}, Produto {order.productId}, Quantidade {order.quantity}
              </span>
              <div>
                <button
                  onClick={() => handleEdit(order)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(order.id)}
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
