import { FC, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import TaskPage from "./pages/TaskPage/TaskPage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import taskStore from "./store/TaskStore";
import categoryStore from "./store/CategoryStore";
import styles from "./App.module.css";

const App: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = [
          taskStore.fetchTasks(),
          categoryStore.fetchCategories(),
        ];
        await Promise.allSettled(promises);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading && (
        <div className={styles.loader_wrapper}>
          <div className={styles.loader}></div>
        </div>
      )}
      {!isLoading && (
        <div className="App">
          <Routes>
            <Route path="*" element={<Navigate to="tasks" replace={true} />} />
            <Route path="/tasks" element={<TaskPage />} />
            <Route path="/categories" element={<CategoryPage />} />
          </Routes>
        </div>
      )}
    </>
  );
};

export default App;
