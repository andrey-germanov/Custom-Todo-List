import create, { State, StateCreator } from 'zustand';
import { generateId } from '../helpers';
import { devtools, persist } from "zustand/middleware";

export type Task = {
    id: string;
    title: string;
    createdTask: Date;
    priority: string;
}
interface ToDoStore {
    tasks: Task[],
    deletedTasks: Task[],
    doneTasks: Task[],
    darkTheme: boolean,
    createTask: (title: string, priority: string) => void;
    updateTask: (id: string, title: string, priority: string) => void;
    removeTask: (id: string, title: string, priority: string) => void;
    doneTask: (id: string, title: string, priority: string) => void;
    removeArchiveDeletedTasks: () => void;
    setDarkTheme: (darkTheme: boolean) => void;
}

const isToDoStore = (object: any): object is ToDoStore =>{
    return 'tasks' in object;
}
const isToDoDoneTasks = (object: any): object is ToDoStore =>{
    return 'doneTasks' in object;
}
const isToDoDeletedTasks = (object: any): object is ToDoStore =>{
    return 'deletedTasks' in object;
}

const darkTheme = (object: any): object is ToDoStore =>{
    return 'darkTheme' in object;
}

const localStorageUpdate = <T extends State>(config: StateCreator<T>): StateCreator<T> => (set, get, api) => config((nextState, ...args) => {
     if(isToDoStore(nextState)) window.localStorage.setItem('tasks', JSON.stringify(nextState.tasks));
     if(isToDoDoneTasks(nextState)) window.localStorage.setItem('doneTasks', JSON.stringify(nextState.doneTasks));
     if(isToDoDeletedTasks(nextState)) window.localStorage.setItem('deletedTasks', JSON.stringify(nextState.deletedTasks));
     if(darkTheme(nextState)) window.localStorage.setItem('darkTheme', JSON.stringify(nextState.darkTheme));
     set(nextState, ...args);
  }, get, api);

const currentTaskState = (nameState: string) => {
    try {
        const currentTaskStore = (JSON.parse(window.localStorage.getItem(nameState) || '[]')) as Task[];
        return currentTaskStore;
    } catch (error) {
        console.log('error')
    }
    return [];
}
const currentThemeState = (nameState: string) => {
    try {
        const currentTaskStore = (JSON.parse(window.localStorage.getItem(nameState) || '[]'));
        return currentTaskStore;
    } catch (error) {
        console.log('error currentThemeState')
    }
    return [];
}
export const useToDoStore = create<ToDoStore>(devtools(localStorageUpdate(
    (set, get) => ({
        tasks: currentTaskState('tasks'),
        deletedTasks: currentTaskState('deletedTasks'),
        doneTasks: currentTaskState('doneTasks'),
        darkTheme: currentThemeState('darkTheme'),
        setDarkTheme: (darkTheme: boolean) => set({ darkTheme }),
        createTask: (title: string, priority: string) => {
            const { tasks } = get();
            const newTask = [{
                id: generateId(),
                title,
                createdTask: new Date(),
                priority
            }]
            set({
                tasks: newTask.concat(tasks),
            })
        },
        updateTask: (id: string, title: string, priority: string) => {
            const { tasks } = get();
            set({
                tasks: tasks.map((task)=>({
                    ...task,
                    title: task.id === id ? title : task.title,
                    priority: task.id === id ? priority : task.priority
                }))
            })
        },
        removeTask: (id: string, title: string, priority: string) => {
            const { tasks, deletedTasks} = get();
            const deletedTask = [{
                id,
                title,
                createdTask: new Date(),
                priority,
            }]
            set({
                tasks: tasks.filter((task)=> task.id !== id),
                deletedTasks: deletedTask.concat(deletedTasks),
            })
        },
        doneTask: (id: string, title: string, priority: string) => {
            const { doneTasks, tasks } = get();
            const doneTask = [{
                id,
                title,
                createdTask: new Date(),
                priority,
            }]
            set({
                tasks: tasks.filter((task)=> task.id !== id),
                doneTasks: doneTask.concat(doneTasks),
            })
        },
        removeArchiveDeletedTasks: () => {
            // const { deletedTasks } = get();
            // console.log('object')
            // set({
            //     deletedTasks: [],
            // })
        }
    })
)));