import { NextResponse, NextRequest } from "next/server";
import prismadb from "@/app/libs/prismadb";
import { Category } from "@/app/types";


export const GET = async () => {
  try {
    const categories = await prismadb.category.findMany();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return new NextResponse("Error", { status: 500 });
  }
};

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
    return new NextResponse("error", { status: 500 });
  }
};
