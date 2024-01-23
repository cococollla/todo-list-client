import React, { FC, useState } from "react";
import { Navigate, Route, Routes, useMatch } from "react-router-dom";
import Header from "./components/Header/Header";
import TaskList from "./components/TaskList/TaskList";
import CreateTask from "./components/Task/CreateTask/CreateTask";
import CategotyList from "./components/CategoryList/CategoryList";
import CreateCategory from "./components/Category/CreateCategory/CreateCategory";

const App: FC = () => {
  const [taskModalOpen, setTaskModalOpen] = useState<boolean>(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState<boolean>(false);
  const linkToTasks = useMatch("tasks");

  return (
    <div className="App">
      <Header
        setModalActive={linkToTasks ? setTaskModalOpen : setCategoryModalOpen}
        navLink={linkToTasks ? "Добавить задачу" : "Добавить категорию"}
      />
      <Routes>
        <Route path="*" element={<Navigate to="tasks" replace={true} />} />
        <Route
          path="/tasks"
          element={
            <TaskList
              createActive={taskModalOpen}
              setCreateActive={setTaskModalOpen}
            />
          }
        />
        <Route
          path="/categories"
          element={
            <CategotyList
              createActive={categoryModalOpen}
              setCreateActive={setCategoryModalOpen}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
