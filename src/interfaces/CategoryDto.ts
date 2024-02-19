import Category from "./Category";

export type CategoryDto = Pick<Category, "name" | "description">;
