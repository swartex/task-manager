import zod from "zod";
import { Category } from "@prisma/client";

import { ActionState } from "@/libs/createAction";

import { UpdateCategory } from "./schema";

export type InputType = zod.infer<typeof UpdateCategory>;
export type ReturnType = ActionState<InputType, Category>;
