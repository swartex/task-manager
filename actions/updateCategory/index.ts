'use server';

import { revalidatePath } from 'next/cache';

import { createAction } from '@/libs/createAction';
import prisma from '@/libs/prismadb';

import { UpdateCategory } from './schema';
import { type InputType, type ReturnType } from './types';

const handler = async (data: InputType): Promise<ReturnType> => {
  let updatedCategory;

  const { id, ...rest } = data;
  try {
    updatedCategory = await prisma.category.update({
      where: { id },
      data: { ...rest },
    });
  } catch (error) {
    return {
      error: 'Failed to create categroy.',
    };
  }

  revalidatePath(`/category`);
  return { data: updatedCategory };
};

export const updateCategory = createAction(UpdateCategory, handler);
