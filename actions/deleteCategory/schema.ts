import zod from 'zod';

export const DeleteCategory = zod.object({
  id: zod.string(),
});
