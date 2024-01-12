import React, { FC } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import HeaderProps from "../../interfaces/HeaderProps";

const Header: FC<HeaderProps> = ({ openCreateTaskModal }) => {
  const handleCreateTaskClick = () => {
    openCreateTaskModal();
  };

  return (
    <div className="header">
      <div className="nav-item">
        <label id="title" className="nav-title">
          ToDo List
        </label>
        <div>
          <Link to="/tasks" className="nav-link">
            Задачи
          </Link>
          <label className="separator">|</label>
          <Link to="/categories" className="nav-link">
            Категории
          </Link>
        </div>
      </div>
      <div>
        <a className="nav-link" onClick={handleCreateTaskClick}>
          Добавить задачу
        </a>
      </div>
    </div>
  );
};

export default Header;
