import { NextResponse, NextRequest } from 'next/server';
import prismadb from '@/libs/prismadb';

export const GET = async () => {
  try {
    const categories = await prismadb.category.findMany();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return new NextResponse('Error', { status: 500 });
  }
};

// add new category route
export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const { title, description } = body;
  try {
    const newCategory = await prismadb.category.create({
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (e) {
    return new NextResponse('error', { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  const { id } = await req.json();
  try {
    await prismadb.category.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      success: true,
      deletedCategoryId: id,
    });
  } catch (e) {
    console.log(e);
    return new NextResponse('error', { status: 500 });
  }
};

export const PATCH = async (req: NextRequest) => {
  const { id, title, description } = await req.json();

  const category = await prismadb.category.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      description: description,
    },
  });

  return NextResponse.json(category);
};
