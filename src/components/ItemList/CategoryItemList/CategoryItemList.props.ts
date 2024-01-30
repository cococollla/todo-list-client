import Category from "../../../interfaces/Category";

interface CategoryItemListProps {
  data: Category;
  onHandleDelete: (value: Category) => void;
  onHandleEdit: (value: Category) => void;
}

export default CategoryItemListProps;
