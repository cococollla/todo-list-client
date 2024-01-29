import { FC, useState } from "react";
import Category from "../../interfaces/Category";
import CategoryList from "../../components/CategoryList/CategoryList";
import EditCategory from "../../components/Category/EditCategory/EditCategory";
import CreateCategory from "../../components/Category/CreateCategory/CreateCategory";
import { observer } from "mobx-react";
import DeletePopup from "../../components/ConfirmPopup/DeletePopup/DeletePopup";
import CategoryPageProps from "./CategoryPage.props";

const CategoryPage: FC<CategoryPageProps> = ({ isOpen, onClose }) => {
  const [editTaskModalOpen, setEditTaskModalOpen] = useState<boolean>(false);
  const [deletModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [selectedCategory, setselectedCategory] = useState<Category>({
    id: 0,
    name: "",
    description: "",
  });

  return (
    <div>
      <CategoryList
        setSelectedCategory={setselectedCategory}
        setDeleteModalOpen={setDeleteModalOpen}
        setEditModalOpen={setEditTaskModalOpen}
      />

      {<CreateCategory isOpen={isOpen} onClose={() => onClose(false)} />}

      {
        <EditCategory
          category={selectedCategory}
          isOpen={editTaskModalOpen}
          onClose={() => setEditTaskModalOpen(false)}
        />
      }

      {
        <DeletePopup
          data={selectedCategory}
          title="Удаление категории"
          isOpen={deletModalOpen}
          onClose={() => setDeleteModalOpen(false)}
        />
      }
    </div>
  );
};

export default observer(CategoryPage);
