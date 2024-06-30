import { type Todo } from '@prisma/client';
import type zod from 'zod';

import { type ActionState } from '@/libs/createAction';

import { type CreateTodo } from './schema';

export type InputType = zod.infer<typeof CreateTodo>;
export type ReturnType = ActionState<InputType, Todo>;
