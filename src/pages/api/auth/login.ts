import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret_key'; // Substitua por uma chave secreta mais segura

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login de usuário
 *     description: Autentica um usuário com e-mail e senha.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Senha inválida
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro no login
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Senha inválida' });
    }

    // Gerar o token JWT
    const token = jwt.sign({ email: user.email, id: user.id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token }); // Retornar o token no corpo da resposta
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: 'Erro no login' });
  }
}
