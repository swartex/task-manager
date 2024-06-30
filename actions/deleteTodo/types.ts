import type { Todo } from '@prisma/client';
import type zod from 'zod';

import type { ActionState } from '@/libs/createAction';

import type { DeleteTodo } from './schema';

export type InputType = zod.infer<typeof DeleteTodo>;
export type ReturnType = ActionState<InputType, Todo>;
