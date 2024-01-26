import Category from "../interfaces/Category";
import BaseApiService from "./BaseApiService";

class CategoryApiService extends BaseApiService {
  async createCategory(newCategory: {
    name: string;
    description: string;
  }): Promise<Category> {
    return this.request("/AddCategory", "POST", newCategory);
  }

  async editCategory(editedCategory: Category): Promise<Category> {
    return this.request("/UpdateCategory", "POST", editedCategory);
  }

  async deleteCategory(categoryId: number) {
    return this.request(`/RemoveCategory/${categoryId}`, "GET");
  }
}

export default CategoryApiService;
