import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient as ProductsPrismaClient } from '@prisma/client-products';

const prisma = new ProductsPrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const products = await prisma.product.findMany();
        return res.status(200).json(products);
      } catch (error) {
        console.error(error); // Log do erro para depuração
        return res.status(500).json({ error: 'Error fetching products' });
      }

    case 'POST':
      const { name, price } = req.body;
      try {
        const newProduct = await prisma.product.create({
          data: {
            name,
            price,
          },
        });
        return res.status(201).json(newProduct);
      } catch (error) {
        console.error(error); // Log do erro para depuração
        return res.status(500).json({ error: 'Error creating product' });
      }

    default:
      return res.setHeader('Allow', ['GET', 'POST']).status(405).end(`Method ${req.method} Not Allowed`);
  }
}
