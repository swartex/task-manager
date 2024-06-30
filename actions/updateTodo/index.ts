'use server';

import { revalidatePath } from 'next/cache';

import { createAction } from '@/libs/createAction';
import prisma from '@/libs/prismadb';

import { UpdateTodo } from './schema';
import { type InputType, type ReturnType } from './types';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { id, category_id, ...rest } = data;

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
        category_id,
        ...rest,
      },
    });
  } catch (error) {
    return {
      error: 'Failed to update todo.',
    };
  }

  revalidatePath(`/category/${category_id}`);
  return { data: updatedTodo };
};

export const updateTodo = createAction(UpdateTodo, handler);
