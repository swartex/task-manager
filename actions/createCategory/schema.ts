import zod from 'zod';

export const CreateCategory = zod.object({
  title: zod.string(),
  description: zod.string().optional(),
  slug: zod.string().trim().max(100).optional(),
  // tags: zod.optional()
});
