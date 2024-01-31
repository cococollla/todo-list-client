import { FC } from "react";
import CategoryList from "../../components/CategoryList/CategoryList";
import CreateCategory from "../../components/Category/CreateCategory/CreateCategory";
import { observer } from "mobx-react";
import CategoryPageProps from "./CategoryPage.props";

const CategoryPage: FC<CategoryPageProps> = ({ isOpen, onClose }) => {
  return (
    <div>
      <CategoryList />
      <CreateCategory isOpen={isOpen} onClose={() => onClose(false)} />
    </div>
  );
};

export default observer(CategoryPage);
