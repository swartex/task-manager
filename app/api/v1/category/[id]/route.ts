import { NextResponse, NextRequest } from "next/server";
import prismadb from "@/app/libs/prismadb";

interface IParams {
  categoryID: string;
}

export const DELETE = async (req: NextRequest) => {
  const { category_id } = await req.json();
  try {
    const deletedCategory = await prismadb.category.delete({
      where: {
        id: category_id,
      },
    });

    return NextResponse.json(deletedCategory);
  } catch (e) {
    console.log(e);
    return new NextResponse("error", { status: 500 });
  }
};
