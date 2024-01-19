import { FC, useState } from "react";
import styles from "./CategoryDropdown.module.css";
import CategoryDropdownProps from "./CategoryDropdown.props";
import Category from "../../interfaces/Category";
import categoryStore from "../../store/CategoryStore";

const CategoryDropdown: FC<CategoryDropdownProps> = ({
  selectedCategory,
  onCategorySelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickCategory = (category: Category) => {
    onCategorySelect(category);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <div
        className={`${styles.dropdown_header} ${isOpen ? styles.open : ""}`}
        onClick={handleOpenDropdown}
      >
        {selectedCategory ? (
          <div>{selectedCategory.name}</div>
        ) : (
          "Выберите категорию"
        )}
        <img
          src={
            isOpen ? "svg/drop-down-arrow-2.svg" : "svg/drop-down-arrow-1.svg"
          }
        />
      </div>
      {isOpen && (
        <div className={styles.category_list}>
          {categoryStore.categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleClickCategory(category)}
              className={`${styles.dropdown_item} ${
                selectedCategory?.id === category.id ? styles.selected : ""
              }`}
            >
              {category.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
