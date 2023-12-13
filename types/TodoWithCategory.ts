import { Todo, Category } from '@prisma/client';

export type TodoWithCategory = Todo & {
  category: Category;
};
