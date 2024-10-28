// pages/api/products.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Read all products
    const products = await prisma.product.findMany();
    res.json(products);
  } else if (req.method === 'POST') {
    // Create a new product
    const { name, price } = req.body;
    const product = await prisma.product.create({
      data: {
        name,
        price,
      },
    });
    res.status(201).json(product);
  } else if (req.method === 'PUT') {
    // Update a product
    const { id, name, price } = req.body;
    const product = await prisma.product.update({
      where: { id },
      data: { name, price },
    });
    res.json(product);
  } else if (req.method === 'DELETE') {
    // Delete a product
    const { id } = req.body;
    await prisma.product.delete({
      where: { id },
    });
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
