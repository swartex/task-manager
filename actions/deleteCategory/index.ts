'use server';

import { revalidatePath } from 'next/cache';

import { createAction } from '@/libs/createAction';
import prisma from '@/libs/prismadb';

import { DeleteCategory } from './schema';
import { type InputType, type ReturnType } from './types';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { id } = data;

  let deletedCategory;

  if (!id) {
    return {
      error: 'Category not found',
    };
  }

  try {
    deletedCategory = await prisma.category.delete({
      where: { id },
    });
  } catch (error) {
    return {
      error: 'Failed to delete category.',
    };
  }

  revalidatePath(`/category`);
  return { data: deletedCategory };
};

export const deleteCategory = createAction(DeleteCategory, handler);
