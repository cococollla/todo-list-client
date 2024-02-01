import { FC } from "react";
import DropdownList from "../../UiKit/DropdownList/DropdownList";
import Category from "../../interfaces/Category";
import CategoryStore from "../../store/CategoryStore";

interface CategoryDropdownProps {
  selectedCategory: Category | undefined;
  onCategorySelect: (category: Category) => void;
}

const CategoryDropdown: FC<CategoryDropdownProps> = ({
  selectedCategory,
  onCategorySelect,
}) => {
  const renderCategoryOption = (category: Category) => (
    <span>{category.name}</span>
  );

  return (
    <DropdownList
      onSelect={onCategorySelect}
      options={CategoryStore.categories}
      selectedOption={selectedCategory}
      selectMessage="Выберите категорию"
    />
  );
};

export default CategoryDropdown;
