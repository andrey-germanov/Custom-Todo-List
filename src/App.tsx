import "antd/dist/antd.css";
import s from "./App.module.scss";
import './views/styles/reset.scss';
import { useToDoStore } from "./data/stores/UseTodoStore";
import { WithTranslation } from "react-i18next";
import LoginButton from "./Auth0/LoginButton";
import { useAuth0, User } from "@auth0/auth0-react";
import { TodoWork } from "./views/components/TodoWork/TodoWork";
import { useEffect, useState } from "react";
import { SideBar } from './views/components/SideBar/index';
import { Archive } from './views/components/Archive/index';
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

export interface IAppProps extends WithTranslation {}

export const App = ({i18n, t} :IAppProps) => {
  const [switchSideBar, setSwithSideBar] = useState(false);
  const [showSideBarInfo, setShowSideBarInfo] = useState(false)
  const { isAuthenticated }: User = useAuth0();

  const setLanguage = (language: string) => {
    i18n.changeLanguage(language);
  }
  const [tasks, deletedTasks, doneTasks, createTask, updateTask, removeTask, doneTask, removeArchiveDeletedTasks] =
    useToDoStore((state) => [
      state.tasks,
      state.deletedTasks,
      state.doneTasks,
      state.createTask,
      state.updateTask,
      state.removeTask,
      state.doneTask,
      state.removeArchiveDeletedTasks,
    ]);
  useEffect(() => {
    switcherSideBar();
  },[])
  
  const switcherSideBar = () => {
    setSwithSideBar(!switchSideBar)
  }
  const isNotAuthenticated = () => {
    return <div className={s.isNotAuthenticated}>
      <h1>{`${t('isNotAuth')}`}</h1>
      <LoginButton />
    </div>
  }
  return (
    <div className={`${s.todoWrapper}`}>
      <Router>
        {isAuthenticated && <SideBar 
          switcherSideBar={switcherSideBar}
          setSwithSideBar={setSwithSideBar}
          setLanguage={setLanguage}
          isAuthenticated={isAuthenticated}
          setShowSideBarInfo={setShowSideBarInfo}
          showSideBarInfo={showSideBarInfo}
          switchSideBar={switchSideBar}
        />}
          <Routes>
            <Route path={''} 
              element={
                isAuthenticated ? 
                  <div style={{textAlign: 'center', marginTop: '20px'}}>
                    <Link to={'/todoList'}>Start working a tasks</Link>
                  </div> 
                  : isNotAuthenticated()
              }
            />
            <Route path={"/todoList"} 
              element={
                isAuthenticated ?
                  <div className={s.wrapperTodoWork}>
                    <TodoWork 
                      tasks={tasks}
                      deletedTasks={deletedTasks}
                      doneTasks={doneTasks}
                      createTask={createTask}
                      updateTask={updateTask}
                      removeTask={removeTask}
                      doneTask={doneTask}
                      removeArchiveDeletedTasks={removeArchiveDeletedTasks}
                      t={t}
                    />
                  </div>
                : isNotAuthenticated()
              }
            />
            <Route path={"/archive"} 
              element={
                isAuthenticated ?
                  <Archive 
                    deletedTasks={deletedTasks} 
                    doneTasks={doneTasks}
                  />
                : isNotAuthenticated()
              }
            />
          </Routes>
      </Router>
    </div>
  );
};
