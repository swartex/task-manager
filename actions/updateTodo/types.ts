import { type Todo } from '@prisma/client';
import type zod from 'zod';

import { type ActionState } from '@/libs/createAction';

import { type UpdateTodo } from './schema';

export type InputType = zod.infer<typeof UpdateTodo>;
export type ReturnType = ActionState<InputType, Todo>;
