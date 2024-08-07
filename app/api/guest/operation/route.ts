
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: 'operation',
      },
      select: {
        id: true,
        role: true,
        name: true,
      },
    });
    const modifiedUsers = users.map(({ id, role, name }) => ({ id, role, name }));

    return NextResponse.json({
      users: modifiedUsers,
    });
  } catch (error) {
    return new NextResponse(`Error: ${error}`, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
