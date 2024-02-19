import { makeAutoObservable } from "mobx";
import Category from "../interfaces/Category";
import { CategoryDto } from "../interfaces/CategoryDto";
import CategoryApiService from "../services/CategoryApiService";

class CategoryStore {
  categoryApiService = new CategoryApiService();

  categories: Category[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setCategories(categories: Category[]) {
    this.categories = categories;
  }

  async addCategory(category: CategoryDto) {
    const newCategory: Category = await this.categoryApiService.createCategory(
      category
    );
    if (newCategory.id !== 0) {
      this.categories.push(newCategory);
      return newCategory.id;
    }
    return undefined;
  }

  async editCategory(editedCategory: Category) {
    const resultUpdate: Category = await this.categoryApiService.editCategory(
      editedCategory
    );
    if (resultUpdate.id === editedCategory.id) {
      this.categories = this.categories.map((category) =>
        category.id === editedCategory.id ? { ...editedCategory } : category
      );
      return resultUpdate.id;
    }

    return undefined;
  }

  async deleteCategory(categoryId: number) {
    try {
      await this.categoryApiService.deleteCategory(categoryId);
      const deletedCategories = this.categories.filter(
        (c) => c.id !== categoryId
      );
      this.setCategories(deletedCategories);
      return true;
    } catch {
      return false;
    }
  }

  getCategory(categoryId: number) {
    const category = this.categories.find((c) => c.id === categoryId);
    return category;
  }

  async fetchCategories() {
    try {
      const response = await fetch(
        "http://localhost:8089/api/ToDoList/GetCategories"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const data = await response.json();

      this.setCategories(data);
    } catch (error) {
      console.error("Failed fetch categories");
    }
  }
}

export default new CategoryStore();
