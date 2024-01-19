import Category from "../../../interfaces/Category";

interface EditCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category;
  onEditCategory: (category: Category) => void;
}

export default EditCategoryProps;
