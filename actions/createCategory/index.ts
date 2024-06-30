'use server';

import { revalidatePath } from 'next/cache';

import { createAction } from '@/libs/createAction';
import prisma from '@/libs/prismadb';

import { CreateCategory } from './schema';
import { type InputType, type ReturnType } from './types';

const handler = async (data: InputType): Promise<ReturnType> => {
  let createdCategory;

  try {
    createdCategory = await prisma.category.create({
      data: { ...data },
    });
  } catch (error) {
    return {
      error: 'Failed to create categroy.',
    };
  }

  revalidatePath(`/category`);
  return { data: createdCategory };
};

export const createCategory = createAction(CreateCategory, handler);
