import { FC } from "react";
import { Navigate, Route, Routes, useMatch } from "react-router-dom";
import Header from "./components/Header/Header";
import TaskPage from "./pages/TaskPage";
import CategoryPage from "./pages/CategoryPage";

const App: FC = () => {
  const linkToTasks = useMatch("/tasks");

  return (
    <div className="App">
      <Header
        modalType={linkToTasks ? "createTask" : "createCategory"}
        navLink={linkToTasks ? "Добавить задачу" : "Добавить категорию"}
      />
      <Routes>
        <Route path="*" element={<Navigate to="tasks" replace={true} />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/categories" element={<CategoryPage />} />
      </Routes>
    </div>
  );
};

export default App;
