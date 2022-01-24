import {FilterType, TodolistsType} from "../App";
import {v1} from "uuid";


type ActionsType = AddTodolistActionType | RemoveTodolistType | ChangeTodolistTitleType | FilteredTodolistTasks;

export const todolistReducer = (state: TodolistsType, action: ActionsType) => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            return [...state, {id: v1(), title: action.title, filter: 'all'}];
        }

        case "REMOVE-TODOLIST": {
            const stateCopy = [...state];
            return stateCopy.filter( td => td.id !== action.id );
        }

        case "CHANGE-TODOLIST-TITLE": {
            const stateCopy = [...state];
            let todolist = stateCopy.find( td => td.id === action.id);
            if (todolist) {
                todolist.title = action.title
            }
            return stateCopy;
        }

        case "FILTER-TODOLIST-TASKS": {
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

type AddTodolistActionType = { type: 'ADD-TODOLIST', title: string };
export const addTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title }
}

type RemoveTodolistType = {type: 'REMOVE-TODOLIST', id: string};
export const removeTodolistAC = (id: string): RemoveTodolistType => {
    return {type: 'REMOVE-TODOLIST', id}
}

type ChangeTodolistTitleType = {type: 'CHANGE-TODOLIST-TITLE', id: string, title: string};
export const changeTodolistAC = (id: string, title: string): ChangeTodolistTitleType => {
    return {type: "CHANGE-TODOLIST-TITLE", title, id}
}

type FilteredTodolistTasks = { type: 'FILTER-TODOLIST-TASKS', id: string, value: FilterType }
export const filteredTodolistTasksAC = (id: string, value: FilterType): FilteredTodolistTasks => {
    return { type: "FILTER-TODOLIST-TASKS", id, value }
}