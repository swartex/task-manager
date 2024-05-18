'use server';

import { revalidatePath } from 'next/cache';

import prisma from '@/libs/prismadb';
import { createAction } from '@/libs/createAction';

import { UpdateTodo } from './schema';
import { InputType, ReturnType } from './types';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { id, categoryId, ...rest } = data;

  let updatedTodo;

  if (!id) {
    return {
      error: 'Todo not found',
    };
  }

  try {
    updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        category_id: categoryId,
        ...rest,
      }
    });
  } catch (error) {
    return {
      error: 'Failed to update todo.',
    };
  }

  revalidatePath(`/category/${categoryId}`);
  return { data: updatedTodo };
};

export const updateTodo = createAction(UpdateTodo, handler);
