'use server';

import { revalidatePath } from 'next/cache';

import prisma from '@/libs/prismadb';
import { createAction } from '@/libs/createAction';

import { CreateCategory } from './schema';
import { InputType, ReturnType } from './types';

const handler = async (data: InputType): Promise<ReturnType> => {
  let createdCategory;

  try {
    createdCategory = await prisma.category.create({
      data: {...data}
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
