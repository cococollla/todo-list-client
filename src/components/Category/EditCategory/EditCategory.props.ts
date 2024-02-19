import Category from "../../../interfaces/Category";

interface EditCategoryProps {
  category: Category;
  isOpen: boolean;
  onClose: () => void;
}

export default EditCategoryProps;
