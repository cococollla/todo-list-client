import Category from "../../../interfaces/Category";

interface DeleteCategoryProps {
  category: Category;
  onDeleteCategory: (category: Category) => void;
}

export default DeleteCategoryProps;
