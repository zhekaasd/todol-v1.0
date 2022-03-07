import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";


const reducers = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

type StoreType = typeof store;
export type AppStoreType = ReturnType<typeof reducers>;
export const store = createStore(reducers);

// @ts-ignore
window.store = store;