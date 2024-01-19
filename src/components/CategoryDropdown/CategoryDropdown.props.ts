import Category from "../../interfaces/Category";

interface CategoryDropdownProps {
  selectedCategory: Category | undefined;
  onCategorySelect: (category: Category) => void;
}

export default CategoryDropdownProps;
