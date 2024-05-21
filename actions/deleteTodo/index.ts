'use server';

import { revalidatePath } from 'next/cache';

import prisma from '@/libs/prismadb';
import { createAction } from '@/libs/createAction';

import { DeleteTodo } from './schema';
import { InputType, ReturnType } from './types';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { id } = data;

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

  revalidatePath(`/category/${deletedTodo.category_id}`);
  return { data: deletedTodo };
};

export const deleteTodo = createAction(DeleteTodo, handler);
