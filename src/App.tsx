import "antd/dist/antd.css";
import s from "./App.module.scss";
import { useToDoStore } from "./data/stores/UseTodoStore";
import { WithTranslation } from "react-i18next";
import { Button } from "antd";
import LoginButton from "./Auth0/LoginButton";
import LogoutButton from "./Auth0/LogoutButton";
import Profile from "./Auth0/Profile";
import { useAuth0, User } from "@auth0/auth0-react";
import { TodoWork } from "./views/components/TodoWork/TodoWork";

export interface IAppProps extends WithTranslation {}

export const App = ({i18n, t} :IAppProps) => {
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
    console.log(tasks)
  return (
    <div className={s.todoWrapper}>
      <header>
        <div>
          Todo List by AnGe
        </div>
        <div className={s.todoProfile}>
          <Profile />
        </div>
        <div>
          <Button onClick={() => setLanguage("en")}>ENGLISH</Button>
          <Button onClick={() => setLanguage("ru")}>ru</Button>
          { isAuthenticated ? <LogoutButton /> : <LoginButton />}
        </div>
      </header>
      {/* {data.map(item=>{
        return item.map((items:DataType)=> <div>{items.id}</div>)
      })} */}
      {
        isAuthenticated && 
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
      }
      {/* <Router>
            <Suspense fallback={<p>...Loading</p>}>
                <Switch>
                    <Route exact path={"/"} component={}
                    />
                    <Route path={"/about"} component={About} />
                </Switch>
            </Suspense>
        </Router> */}
      
    </div>
  );
};
