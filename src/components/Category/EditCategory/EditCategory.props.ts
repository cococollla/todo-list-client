import Category from "../../../interfaces/Category";

interface EditCategoryProps {
  category: Category;
  onEditCategory: (category: Category) => void;
}

export default EditCategoryProps;
