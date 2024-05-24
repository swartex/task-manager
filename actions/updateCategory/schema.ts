import zod from 'zod';

export const UpdateCategory = zod.object({
  id: zod.string(),
  title: zod.string(),
  description: zod.string().optional(),
  slug: zod.string().trim().max(100).optional(),
  // tags: zod.optional()
});
