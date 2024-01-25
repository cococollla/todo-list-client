import { FC } from "react";
import { Navigate, Route, Routes, useMatch } from "react-router-dom";
import Header from "./components/Header/Header";
import TaskList from "./components/TaskList/TaskList";
import CategotyList from "./components/CategoryList/CategoryList";

const App: FC = () => {
  const linkToTasks = useMatch("tasks");

  return (
    <div className="App">
      <Header
        modalType={linkToTasks ? "createTask" : "createCategory"}
        navLink={linkToTasks ? "Добавить задачу" : "Добавить категорию"}
      />
      <Routes>
        <Route path="*" element={<Navigate to="tasks" replace={true} />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/categories" element={<CategotyList />} />
      </Routes>
    </div>
  );
};

export default App;
