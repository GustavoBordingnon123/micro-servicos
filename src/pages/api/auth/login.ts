// pages/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  console.log('Entrando no handler');

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { email, password } = req.body;

  try {
    console.log('Tentando buscar usuário');

    const user = await prisma.user.findUnique({ where: { email } });
    
    console.log('Usuário encontrado: "', user);

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Senha inválida' });
    }

    res.status(200).json({ message: 'Login bem-sucedido' });
    
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: 'Erro no login' });
  }
}
