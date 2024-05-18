import zod from 'zod';

export const DeleteTodo = zod.object({
  id: zod.string(),
  categoryId: zod.string(),
});
