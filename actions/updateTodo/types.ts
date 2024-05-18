import zod from "zod";
import { Todo } from "@prisma/client";

import { ActionState } from "@/libs/createAction";

import { UpdateTodo } from "./schema";

export type InputType = zod.infer<typeof UpdateTodo>;
export type ReturnType = ActionState<InputType, Todo>;
