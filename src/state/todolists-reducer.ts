import {FilterType, TodolistType} from "../App";
import {v1} from "uuid";

const ADD_TODOLIST = "ADD-TODOLIST";
const REMOVE_TODOLIST = "REMOVE-TODOLIST";
const CHANGE_TODOLIST_TITLE = "CHANGE-TODOLIST-TITLE";
const FILTER_TODOLIST_TASKS = "FILTER-TODOLIST-TASKS";


export type InitialTodolistsStateType = Array<TodolistType>;
type ActionsType = AddTodolistActionType | RemoveTodolistType | ChangeTodolistTitleType | FilteredTodolistTasks;


const InitialTodolistsState: InitialTodolistsStateType = [];

export const todolistsReducer = (state: InitialTodolistsStateType = InitialTodolistsState, action: ActionsType): InitialTodolistsStateType => {
    switch (action.type) {
        case ADD_TODOLIST: {
            return [...state, {id: action.id, title: action.title, filter: 'all'}];
        }

        case REMOVE_TODOLIST: {
            const stateCopy = [...state];
            return stateCopy.filter( td => td.id !== action.id );
        }

        case CHANGE_TODOLIST_TITLE: {
            const stateCopy = [...state];
            let todolist = stateCopy.find( td => td.id === action.id);
            if (todolist) {
                todolist.title = action.title
            }
            return stateCopy;
        }

        case FILTER_TODOLIST_TASKS: {
            const stateCopy = [...state];
            let todolist = stateCopy.find( td => td.id === action.id );
            if (todolist) {
                todolist.filter = action.value
            }

            return stateCopy;
        }

        default:
            return state;
    }
}

export type AddTodolistActionType = { type: typeof ADD_TODOLIST, title: string, id: string };
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title, id: v1() }
}

export type RemoveTodolistType = {type: typeof REMOVE_TODOLIST, id: string};
export const removeTodolistAC = (id: string): RemoveTodolistType => {
    return {type: 'REMOVE-TODOLIST', id}
}

type ChangeTodolistTitleType = {type: typeof CHANGE_TODOLIST_TITLE, id: string, title: string};
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleType => {
    return {type: "CHANGE-TODOLIST-TITLE", title, id}
}

type FilteredTodolistTasks = { type: typeof FILTER_TODOLIST_TASKS, id: string, value: FilterType }
export const filteredTodolistTasksAC = (id: string, value: FilterType): FilteredTodolistTasks => {
    return { type: "FILTER-TODOLIST-TASKS", id, value }
}