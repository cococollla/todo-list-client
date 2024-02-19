export default interface Task {
  id: number;
  name: string;
  description: string;
  categoryId: number;
}

export function isTask(object: any): object is Task {
  return (
    "id" in object &&
    "name" in object &&
    "description" in object &&
    "categoryId" in object
  );
}
