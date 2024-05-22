import zod from 'zod';

export const CreateTodo = zod.object({
  title: zod.string(),
  description: zod.optional(zod.string()),
  status: zod.boolean(),
  deadline: zod.optional(zod.date()),
  category_id: zod.string(),
  // tags: zod.optional()
});
