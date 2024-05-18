import zod from 'zod';

export const UpdateTodo = zod.object({
  id: zod.string(),
  categoryId: zod.optional(zod.string()),
  title: zod.optional(zod.string()),
  descriptin: zod.optional(zod.string()),
  status: zod.optional(zod.boolean()),
  deadline: zod.optional(zod.date()),
  // tags: zod.optional()
});
