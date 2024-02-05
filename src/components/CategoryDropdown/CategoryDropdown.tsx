import { FC } from "react";
import DropdownList from "../../UiKit/DropdownList/DropdownList";
import Category from "../../interfaces/Category";
import { Option } from "../../UiKit/DropdownList/DropdownList.props";
import CategoryStore from "../../store/CategoryStore";

interface CategoryDropdownProps {
  selectedCategory: Option<Category> | undefined;
  onCategorySelect: (category: Option<Category>) => void;
}

const CategoryDropdown: FC<CategoryDropdownProps> = ({
  selectedCategory,
  onCategorySelect,
}) => {
  const categoryOptions: Option<Category>[] = CategoryStore.categories.map(
    (category) => ({
      value: category,
      name: category.name,
    })
  );

  return (
    <DropdownList
      onSelect={onCategorySelect}
      options={categoryOptions}
      selectedOption={selectedCategory}
      selectMessage="Выберите категорию"
    />
  );
};

export default CategoryDropdown;
