import zod from "zod";
import { Todo } from "@prisma/client";

import { ActionState } from "@/libs/createAction";

import { CreateTodo } from "./schema";

export type InputType = zod.infer<typeof CreateTodo>;
export type ReturnType = ActionState<InputType, Todo>;
