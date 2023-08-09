import { NextResponse } from "next/server";
import prismadb from "@/app/libs/prismadb";

export const GET = async () => {
  const todos = await prismadb.todo.findMany();
  return NextResponse.json(todos, { status: 200 });
};
