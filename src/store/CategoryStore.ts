import { makeAutoObservable } from "mobx";
import Category from "../interfaces/Category";
import ApiServices from "../services/ApiServices";

class CategoryStore {
  categories: Category[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setCategories(categories: Category[]) {
    this.categories = categories;
  }

  async addCategory(category: Category) {
    const newCategory: Category = await ApiServices.createCategory(category);
    if (newCategory.id !== 0) {
      this.categories.push(newCategory);
    }
  }

  editCategory(editedCategory: Category) {
    ApiServices.editCategory(editedCategory).then(() => {
      this.categories = this.categories.map((category) =>
        category.id === editedCategory.id ? { ...editedCategory } : category
      );
    });
  }

  deleteCategory(category: Category) {
    ApiServices.deleteCategory(category.id);
    const deletedCategories = this.categories.filter(
      (c) => c.id !== category.id
    );
    this.setCategories(deletedCategories);
  }
}

export default new CategoryStore();
