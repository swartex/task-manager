'use server';

import { revalidatePath } from 'next/cache';

import prisma from '@/libs/prismadb';
import { createAction } from '@/libs/createAction';

import { DeleteTodo } from './schema';
import { InputType, ReturnType } from './types';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { id, categoryId } = data;

  let deletedTodo;

  if (!id) {
    return {
      error: 'Todo not found',
    };
  }

  try {
    deletedTodo = await prisma.todo.delete({
      where: { id },
    });
  } catch (error) {
    return {
      error: 'Failed to delete todo.',
    };
  }

  revalidatePath(`/category/${categoryId}`);
  return { data: deletedTodo };
};

export const deleteTodo = createAction(DeleteTodo, handler);
