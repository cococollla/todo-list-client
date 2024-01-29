import Category from "../../interfaces/Category";

interface CategoryListProps {
  setSelectedCategory: (category: Category) => void;
  setEditModalOpen: (value: boolean) => void;
  setDeleteModalOpen: (value: boolean) => void;
}

export default CategoryListProps;
