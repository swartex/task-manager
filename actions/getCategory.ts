'use server';

import prisma from '@/libs/prismadb';

export const getCategories = async () => {
  // const req = await axios.get('/api/v1/category');
  const categories = await prisma.category.findMany();

  return categories;
};
