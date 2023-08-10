import { NextResponse, NextRequest } from "next/server";
import prismadb from "@/app/libs/prismadb";

interface IParams {
  categoryID: string;
}

