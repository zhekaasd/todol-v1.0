import {TasksType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistType} from "./todolists-reducer";

const ADD_TASK = 'ADD-TASK';
const REMOVE_TASK = 'REMOVE-TASK';
const UPDATE_TASK_TITLE = 'UPDATE-TASK-TITLE';
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS';

export type InitialTasksStateType = {
    [key: string]: TasksType
}

type ActionsType = AddTaskType | RemoveTaskType | UpdateTaskTitleType | ChangeTaskStatusType | AddTodolistActionType | RemoveTodolistType;

const InitialTasksState: InitialTasksStateType = {};

export const tasksReducer = (state: InitialTasksStateType = InitialTasksState, action: ActionsType): InitialTasksStateType => {
    switch (action.type) {
        case ADD_TASK: {
            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId], {id: v1(), title: action.title, isDone: false}]
            }
        }

        case REMOVE_TASK: {
            return { ...state,
                [action.todolistId]: state[action.todolistId].filter( t => t.id !== action.id)
            }
        }

        case UPDATE_TASK_TITLE: {
            return { ...state,
                [action.todolistId]: state[action.todolistId].map( t => t.id === action.id ? {...t, title: action.title} : t)
            }
        }

        case CHANGE_TASK_STATUS: {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map( t => t.id === action.id ? {...t, isDone: action.value} : t )
            }
        }

        case "REMOVE-TODOLIST": {
            let stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy;
        }

        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.id]: []
            }
        }

        default:
            return state;
    }
}

type AddTaskType = {
    type: typeof ADD_TASK
    todolistId: string
    title: string
}
export const addTaskAC = (todolistId: string, title: string): AddTaskType => {
    return {type: ADD_TASK, todolistId, title}
}

type RemoveTaskType = {
    type: typeof REMOVE_TASK
    todolistId: string
    id: string
}

export const removeTaskAC = (todolistId: string, id: string): RemoveTaskType => {
    return {type: REMOVE_TASK, todolistId, id}
}

type UpdateTaskTitleType = {
    type: typeof UPDATE_TASK_TITLE
    todolistId: string
    id: string
    title: string
}

export const updateTaskTitleAC = (todolistId: string, id: string, title: string): UpdateTaskTitleType => {
    return {type: UPDATE_TASK_TITLE, todolistId, id, title}
}

type ChangeTaskStatusType = { type: typeof CHANGE_TASK_STATUS, id: string, todolistId: string, value: boolean }
export const changeTaskStatus = (todolistId: string, id: string, value: boolean): ChangeTaskStatusType => {
    return { type: CHANGE_TASK_STATUS, id, todolistId, value }
}