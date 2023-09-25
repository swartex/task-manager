import { NextResponse, NextRequest } from "next/server";
import prismadb from "@/libs/prismadb";

interface IParams {
  categoryID: string;
}
