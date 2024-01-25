import { FC } from "react";
import styles from "./Header.module.css";
import HeaderProps from "./Header.props";
import CustomLink from "../CustomLink/CustomLink";
import ModalStore, { ModalType } from "../../store/ModalStore";

const Header: FC<HeaderProps> = ({ modalType, navLink }) => {
  const handleModalOpen = (modalType: ModalType) => {
    ModalStore.setModalIsOpen(true, modalType);
  };

  return (
    <div className={styles.header}>
      <div className={styles.nav_item}>
        <label id="title" className={styles.nav_title}>
          ToDo List
        </label>
        <div>
          <CustomLink to="/tasks" value="Задачи" />
          <label className={styles.separator}>|</label>
          <CustomLink to="/categories" value="Категории" />
        </div>
      </div>
      <div>
        <div
          className={styles.nav_link}
          onClick={() => handleModalOpen(modalType)}
        >
          {navLink}
        </div>
      </div>
    </div>
  );
};

export default Header;
