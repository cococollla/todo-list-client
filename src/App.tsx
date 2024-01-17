import React, { FC, useState } from "react";
import { Navigate, Route, Routes, useMatch } from "react-router-dom";
import Header from "./components/Header/Header";
import TaskList from "./components/TaskList/TaskList";
import CreateTask from "./components/Task/CreateTask/CreateTask";
import CategotyList from "./components/CategoryList/CategoryList";
import CreateCategory from "./components/Category/CreateCategory/CreateCategory";

const App: FC = () => {
  const [isTaskModalOpen, setTaskModalOpen] = useState<boolean>(false);
  const linkToTasks = useMatch("tasks");

  const openCreateTaskModal = () => {
    setTaskModalOpen(true);
  };

  const closeCreateTaskModal = () => {
    setTaskModalOpen(false);
  };

  return (
    <div className="App">
      <Header
        openCreateModal={openCreateTaskModal}
        navLink={linkToTasks ? "Добавить задачу" : "Добавить категорию"}
      />
      <Routes>
        <Route path="*" element={<Navigate to="tasks" replace={true} />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/categories" element={<CategotyList />} />
      </Routes>
      {linkToTasks && (
        <CreateTask isOpen={isTaskModalOpen} onClose={closeCreateTaskModal} />
      )}
      {!linkToTasks && (
        <CreateCategory
          isOpen={isTaskModalOpen}
          onClose={closeCreateTaskModal}
        />
      )}
    </div>
  );
};

export default App;
