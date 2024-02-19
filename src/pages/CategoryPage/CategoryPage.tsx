import { FC, useState } from "react";
import CategoryList from "../../components/CategoryList/CategoryList";
import CreateCategory from "../../components/Category/CreateCategory/CreateCategory";
import { observer } from "mobx-react";
import CategoryPageProps from "./CategoryPage.props";
import Header from "../../components/Header/Header";

const CategoryPage = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState<boolean>(false);

  return (
    <div>
      <Header
        activeModal={
          <div onClick={() => setCreateModalOpen(true)}>Создать категорию</div>
        }
      />
      <CategoryList />
      <CreateCategory
        isOpen={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </div>
  );
};

export default observer(CategoryPage);
