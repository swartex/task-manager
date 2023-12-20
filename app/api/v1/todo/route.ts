import { NextRequest, NextResponse } from 'next/server';
import prismadb from '@/libs/prismadb';

export const GET = async () => {
  const todos = await prismadb.todo.findMany();
  return NextResponse.json(todos, { status: 200 });
};

// add new todo route
export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const { title, description, status, categoryId } = body;
  try {
    const newTodo = await prismadb.todo.create({
      data: {
        title,
        description,
        status,
        category_id: categoryId,
      },
    });

    return NextResponse.json(newTodo, { status: 201 });
  } catch (e) {
    return new NextResponse('error', { status: 500 });
  }
};

export const PATCH = async (req: NextRequest) => {
  const body = await req.json();

  const { id, title, description, status, categoryId } = body;

  try {
    const updateTodo = await prismadb.todo.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        status,
        category_id: categoryId,
      },
    });

    return NextResponse.json(updateTodo);
  } catch (e) {
    return new NextResponse('Internal Error', { status: 500 });
  }
};
