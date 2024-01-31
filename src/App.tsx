import { FC, useEffect, useState } from "react";
import { Navigate, Route, Routes, useMatch } from "react-router-dom";
import Header from "./components/Header/Header";
import TaskPage from "./pages/TaskPage/TaskPage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import taskStore from "./store/TaskStore";
import categoryStore from "./store/CategoryStore";

const App: FC = () => {
  const [isCreateTaskModalOpen, setCreateTaskModalOpen] =
    useState<boolean>(false);
  const [isCreateCategoryModalOpen, setCreateCategoryModalOpen] =
    useState<boolean>(false);
  const linkToTasks = useMatch("/tasks");

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
      <Header
        setModalOpen={
          linkToTasks ? setCreateTaskModalOpen : setCreateCategoryModalOpen
        }
        navLink={linkToTasks ? "Добавить задачу" : "Добавить категорию"}
      />
      <Routes>
        <Route path="*" element={<Navigate to="tasks" replace={true} />} />
        <Route
          path="/tasks"
          element={
            <TaskPage
              isOpen={isCreateTaskModalOpen}
              onClose={setCreateTaskModalOpen}
            />
          }
        />
        <Route
          path="/categories"
          element={
            <CategoryPage
              isOpen={isCreateCategoryModalOpen}
              onClose={() => setCreateCategoryModalOpen(false)}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
