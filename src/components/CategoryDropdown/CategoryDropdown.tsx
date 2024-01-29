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
      selectedOption={selectedCategory}
      onSelect={onCategorySelect}
      options={CategoryStore.categories}
      renderOption={renderCategoryOption}
      selectMessage="Выберите категорию"
    />
  );
};

export default CategoryDropdown;
