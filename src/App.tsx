import { FC, useEffect, useState } from "react";
import { Navigate, Route, Routes, useMatch } from "react-router-dom";
import Header from "./components/Header/Header";
import TaskPage from "./pages/TaskPage/TaskPage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import taskStore from "./store/TaskStore";
import categoryStore from "./store/CategoryStore";

const App: FC = () => {
  const [isCreateCategoryModalOpen, setCreateCategoryModalOpen] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const taskData = taskStore.fetchTasks();
      const categoryData = categoryStore.fetchCategories();
      const promises = [taskData, categoryData];
      Promise.allSettled(promises);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Navigate to="tasks" replace={true} />} />
        <Route path="/tasks" element={<TaskPage />} />
        <Route path="/categories" element={<CategoryPage />} />
      </Routes>
    </div>
  );
};

export default App;
