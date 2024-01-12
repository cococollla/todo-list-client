import React, { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import HeaderProps from "./Header.props";

const Header: FC<HeaderProps> = ({ openCreateTaskModal }) => {
  const handleCreateTaskClick = () => {
    openCreateTaskModal();
  };

  return (
    <div className={styles.header}>
      <div className={styles.nav_item}>
        <label id="title" className={styles.nav_title}>
          ToDo List
        </label>
        <div>
          <Link to="/tasks" className={styles.nav_link}>
            Задачи
          </Link>
          <label className={styles.separator}>|</label>
          <Link to="/categories" className={styles.nav_link}>
            Категории
          </Link>
        </div>
      </div>
      <div>
        <a className={styles.nav_link} onClick={handleCreateTaskClick}>
          Добавить задачу
        </a>
      </div>
    </div>
  );
};

export default Header;
