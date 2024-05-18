import zod from "zod";
import { Todo } from "@prisma/client";

import { ActionState } from "@/libs/createAction";

import { DeleteTodo } from "./schema";

export type InputType = zod.infer<typeof DeleteTodo>;
export type ReturnType = ActionState<InputType, Todo>;
