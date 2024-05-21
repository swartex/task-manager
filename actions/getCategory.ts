'use server';

import prisma from '@/libs/prismadb';

export const getCategories = async () => {
  const categories = await prisma.category.findMany();

  return categories;
};
