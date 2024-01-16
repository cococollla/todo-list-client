import React, { FC, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import TaskList from "./components/TaskList/TaskList";
import CreateTask from "./components/Task/CreateTask/CreateTask";
import CategotyList from "./components/CategoryList/CategoryList";

const App: FC = () => {
  const [isTaskModalOpen, setTaskModalOpen] = useState<boolean>(false);

  const openCreateTaskModal = () => {
    setTaskModalOpen(true);
  };

  const closeCreateTaskModal = () => {
    setTaskModalOpen(false);
  };

  return (
    <Router>
      <div className="App">
        <Header openCreateTaskModal={openCreateTaskModal} />
        <Routes>
          <Route path="/tasks" element={<TaskList />} />
        </Routes>
        <CreateTask isOpen={isTaskModalOpen} onClose={closeCreateTaskModal} />
      </div>
    </Router>
  );
};

export default App;
