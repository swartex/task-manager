import zod from "zod";
import { Category } from "@prisma/client";

import { ActionState } from "@/libs/createAction";

import { DeleteCategory } from "./schema";

export type InputType = zod.infer<typeof DeleteCategory>;
export type ReturnType = ActionState<InputType, Category>;
