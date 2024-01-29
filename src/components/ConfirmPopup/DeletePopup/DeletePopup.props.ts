interface DeleteCategoryProps<T> {
  data: T;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export default DeleteCategoryProps;
