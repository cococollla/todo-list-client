import { FC, useEffect } from "react";
import DeleteCategoryProps from "./DeletePopup.props";
import styles from "./DeletePopup.module.css";
import MainPopup from "../../../UiKit/MainPopup/MainPopup";
import { useLoadingState } from "../../../hooks/useLoadingState";

const DeletePopup: FC<DeleteCategoryProps> = ({
  title,
  isOpen,
  onClose,
  onAccept,
  contentMessage,
}) => {
  const { error, setError, isLoading, setIsLoading, resetState } =
    useLoadingState();

  useEffect(() => {
    setError(null);
  }, []);

  const handleDelte = async () => {
    setIsLoading(true);
    try {
      const successful = await onAccept();
      successful ? onClose() : setError("Произошла ошибка при удалении");
    } catch {
      setError("Произошла ошибка при удалении");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainPopup
      isOpened={isOpen}
      onClose={onClose}
      buttonText="Да"
      error={error}
      isDisabled={false}
      isLoading={isLoading}
      onSubmit={handleDelte}
      title={title}
    >
      <div className={styles.msg_delete}>{contentMessage}</div>
    </MainPopup>
  );
};

export default DeletePopup;
