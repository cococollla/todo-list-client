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
    }
  }

  editCategory(editedCategory: Category) {
    this.categoryApiService.editCategory(editedCategory).then(() => {
      this.categories = this.categories.map((category) =>
        category.id === editedCategory.id ? { ...editedCategory } : category
      );
    });
  }

  deleteCategory(category: Category) {
    this.categoryApiService.deleteCategory(category.id);
    const deletedCategories = this.categories.filter(
      (c) => c.id !== category.id
    );
    this.setCategories(deletedCategories);
  }

  getCategory(categoryId: number) {
    const category = this.categories.find((c) => c.id === categoryId);
    return category;
  }

  fetchCategories() {
    fetch("http://localhost:8089/api/ToDoList/GetCategories")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch category");
        }
        return response.json();
      })
      .then((data) => {
        this.setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error.message);
      });
  }
}

export default new CategoryStore();
