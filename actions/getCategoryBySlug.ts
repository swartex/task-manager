'use server';
import { Category } from '@prisma/client';

import prisma from '@/libs/prismadb';

/**
 * @param {string} slug
 * @returns {Category}
 */
export const getCategoryBySlug = async (slug: string) => {
  try {
    const category = await prisma.category.findUnique({
      where: { slug },
    });

    return category;
  } catch (e) {
    console.error('[ERROR] ', e);
  }
};
