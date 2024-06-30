import { type NextRequest, NextResponse } from 'next/server';

import prismadb from '@/libs/prismadb';

export const GET = async () => {
  const todos = await prismadb.todo.findMany();
  return NextResponse.json(todos, { status: 200 });
};

// add new todo route
export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const { title, description, status, deadline, categoryId } = body;
  try {
    const newTodo = await prismadb.todo.create({
      data: {
        title,
        description,
        status,
        deadline,
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

  const { id, title, description, status, deadline, categoryId } = body;

  try {
    const updateTodo = await prismadb.todo.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        status,
        deadline,
        category_id: categoryId,
      },
    });

    return NextResponse.json(updateTodo);
  } catch (e) {
    return new NextResponse('Internal Error', { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  const { todoId } = await req.json();

  try {
    await prismadb.todo.delete({
      where: {
        id: todoId,
      },
    });

    return NextResponse.json({
      success: true,
      deletedCategoryId: todoId,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Error', { status: 500 });
  }
};
