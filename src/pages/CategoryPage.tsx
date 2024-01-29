import { useState } from "react";
import Category from "../interfaces/Category";
import CategoryList from "../components/CategoryList/CategoryList";
import ModalStore from "../store/ModalStore";
import EditCategory from "../components/Category/EditCategory/EditCategory";
import CreateCategory from "../components/Category/CreateCategory/CreateCategory";
import { observer } from "mobx-react";
import DeletePopup from "../components/ConfirmPopup/DeletePopup/DeletePopup";

const CategoryPage = () => {
  const [selectedCategory, setselectedCategory] = useState<Category>({
    id: 0,
    name: "",
    description: "",
  });

  return (
    <div>
      <CategoryList setSelectedCategory={setselectedCategory} />

      {ModalStore.modalIsOpen && ModalStore.modalType === "createCategory" && (
        <CreateCategory />
      )}

      {selectedCategory && ModalStore.modalType === "editCategory" && (
        <EditCategory category={selectedCategory} />
      )}

      {selectedCategory && ModalStore.modalType === "deleteConfirm" && (
        <DeletePopup data={selectedCategory} title="Удаление категории" />
      )}
    </div>
  );
};

export default observer(CategoryPage);
