import { makeAutoObservable } from "mobx";
import Category from "../interfaces/Category";
import ApiServices from "../services/ApiServices";

class CategoryStore {
  categories: Category[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setCategory(categories: Category[]) {
    this.categories = categories;
  }

  async addCategory(category: Category) {
    const newCategory: Category = await ApiServices.createCategory(category);
    if (newCategory.id !== 0) {
      this.categories.push(newCategory);
    }
  }
}

export default new CategoryStore();
