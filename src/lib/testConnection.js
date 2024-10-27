// src/lib/testConnection.js
import prisma from './prisma.js'; // Adicione .js à importação

async function testConnection() {
  try {
    const users = await prisma.user.findMany(); // Tente buscar usuários como um teste
    console.log('Conexão bem-sucedida:', users);
  } catch (error) {
    console.error('Erro na conexão com o banco de dados:', error);
  } finally {
    await prisma.$disconnect(); // Certifique-se de desconectar após o teste
  }
}

testConnection();
