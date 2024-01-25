import { makeAutoObservable } from "mobx";

export type ModalType =
  | "createTask"
  | "deleteTask"
  | "editTask"
  | "createCategory"
  | "editCategory"
  | "deleteCategory";

class ModalStore {
  modalIsOpen = false;
  modalType: ModalType = "createTask";

  constructor() {
    makeAutoObservable(this);
  }

  setModalIsOpen(open: boolean, modalType: ModalType) {
    this.modalIsOpen = open;
    this.modalType = modalType;
  }
}

export default new ModalStore();
