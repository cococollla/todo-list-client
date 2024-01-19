import Category from "../../../interfaces/Category";

interface DeleteCategoryProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category;
  onDeleteCategory: (category: Category) => void;
}

export default DeleteCategoryProps;
