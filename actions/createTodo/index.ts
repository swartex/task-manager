'use server';
import { revalidatePath } from 'next/cache';

import { createAction } from '@/libs/createAction';
import prisma from '@/libs/prismadb';

import { CreateTodo } from './schema';
import { type InputType, type ReturnType } from './types';

const handler = async (data: InputType): Promise<ReturnType> => {
  let createdTodo;

  try {
    createdTodo = await prisma.todo.create({
      data: { ...data },
    });
  } catch (error) {
    return {
      error: 'Failed to create todo.',
    };
  }

  revalidatePath(`/category/${createdTodo.category_id}`);
  return { data: createdTodo };
};

export const createTodo = createAction(CreateTodo, handler);
