import type { NextApiRequest, NextApiResponse } from 'next';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '@/lib/swagger';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    swaggerUi.setup(swaggerSpec)(req, res);
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
