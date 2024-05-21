import zod from 'zod';

export const UpdateTodo = zod.object({
  id: zod.string(),
  category_id: zod.optional(zod.string()),
  title: zod.optional(zod.string()),
  description: zod.optional(zod.string()),
  status: zod.optional(zod.boolean()),
  deadline: zod.optional(zod.date()),
  // tags: zod.optional()
});
