import Task from "./Task";

export type TaskDto = Pick<Task, "name" | "description" | "categoryId">;
