import { useEffect, useState } from "react";
import Category from "../../interfaces/Category";
import categoryStore from "../../store/CategoryStore";
import styles from "./CategotyList.module.css";
import { observer } from "mobx-react";
import CategoryItemList from "../ItemList/CategoryItemList/CategoryItemList";
import EditCategory from "../Category/EditCategory/EditCategory";
import CategoryStore from "../../store/CategoryStore";
import Dialog from "../../UiKit/Dialog/Dialog";
import { useLoadingState } from "../../hooks/useLoadingState";

export const CategotyList = ({}) => {
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category>({
    id: 0,
    name: "",
    description: "",
  });
  const [isDiasbled, setIsDisabled] = useState<boolean>(false);
  const { error, setError, isLoading, setIsLoading, resetState } =
    useLoadingState();

  useEffect(() => {
    if (!deleteModalOpen) {
      setError(null);
    }
  }, [deleteModalOpen]);

  const handleDelte = async () => {
    setIsLoading(true);
    setIsDisabled(true);
    try {
      const successful = await CategoryStore.deleteCategory(
        selectedCategory.id
      );
      successful
        ? setDeleteModalOpen(false)
        : setError("Произошла ошибка при удалении");
    } catch {
      setError("Произошла ошибка при удалении");
    } finally {
      setIsLoading(false);
      setIsDisabled(false);
    }
  };

  const handleDeleteClick = (category: Category) => {
    setSelectedCategory(category);
    setDeleteModalOpen(true);
  };
  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    setEditModalOpen(true);
  };

  return (
    <>
      {categoryStore.categories.length === 0 ? (
        <div className={styles.error}>
          Не удалось загрузить список категорий
        </div>
      ) : (
        categoryStore.categories.map((category) => (
          <CategoryItemList
            data={category}
            onDelete={handleDeleteClick}
            onEdit={handleEditClick}
          />
        ))
      )}
      <EditCategory
        category={selectedCategory}
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
      />

      <Dialog
        isOpened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        primaryButtonText="Да"
        secondaryButtonText="Закрыть"
        primaryButtonOnClick={handleDelte}
        secondaryButtonOnClick={() => setDeleteModalOpen(false)}
        text={`Вы уверены, что хотите удалить катиегорию ${selectedCategory.name}?`}
        title="Удаление категории"
        isLoading={isLoading}
        isDisabled={isDiasbled}
        extraContent={<div className={styles.error}>{error}</div>}
      />
    </>
  );
};

export default observer(CategotyList);
