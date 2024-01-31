import { ReactNode } from "react";

interface ItemListProps<
  T extends { id: number; name: string; description: string }
> {
  data: T;
  onDelete: (value: T) => void;
  onEdit: (value: T) => void;
  extendTitle?: ReactNode;
}

export default ItemListProps;
