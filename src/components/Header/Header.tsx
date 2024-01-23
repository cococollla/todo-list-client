import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import HeaderProps from "./Header.props";
import CustomLink from "../CustomLink/CustomLink";

const Header: FC<HeaderProps> = ({ setModalActive, navLink }) => {
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
        <div className={styles.nav_link} onClick={() => setModalActive(true)}>
          {navLink}
        </div>
      </div>
    </div>
  );
};

export default Header;
