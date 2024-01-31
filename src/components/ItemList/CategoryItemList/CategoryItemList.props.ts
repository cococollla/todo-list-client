import Category from "../../../interfaces/Category";

interface CategoryItemListProps {
  data: Category;
  onDelete: (value: Category) => void;
  onEdit: (value: Category) => void;
}

export default CategoryItemListProps;
