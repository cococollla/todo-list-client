interface DeleteCategoryProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => Promise<boolean>;
  contentMessage: string;
}

export default DeleteCategoryProps;
