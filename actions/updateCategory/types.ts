import { type Category } from '@prisma/client';
import type zod from 'zod';

import { type ActionState } from '@/libs/createAction';

import { type UpdateCategory } from './schema';

export type InputType = zod.infer<typeof UpdateCategory>;
export type ReturnType = ActionState<InputType, Category>;
