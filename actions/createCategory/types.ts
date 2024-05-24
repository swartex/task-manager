import zod from "zod";
import { Category } from "@prisma/client";

import { ActionState } from "@/libs/createAction";

import { CreateCategory } from "./schema";

export type InputType = zod.infer<typeof CreateCategory>;
export type ReturnType = ActionState<InputType, Category>;
