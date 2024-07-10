import { type Todo, type Category } from '@prisma/client';

export type TodoWithCategory = Todo & {
  category: Category;
};
