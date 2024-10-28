import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient as OrdersPrismaClient } from '@prisma/client';

const prisma = new OrdersPrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const orders = await prisma.order.findMany();
        return res.status(200).json(orders);
      } catch (error) {
        console.error(error); // Log do erro para depuração
        return res.status(500).json({ error: 'Error fetching orders' });
      }

    case 'POST':
      const { userId, productId, quantity } = req.body;
      try {
        const newOrder = await prisma.order.create({
          data: {
            userId,
            productId,
            quantity,
          },
        });
        return res.status(201).json(newOrder);
      } catch (error) {
        console.error(error); // Log do erro para depuração
        return res.status(500).json({ error: 'Error creating order' });
      }

    default:
      return res.setHeader('Allow', ['GET', 'POST']).status(405).end(`Method ${req.method} Not Allowed`);
  }
}
