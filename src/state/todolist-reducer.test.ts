import {v1} from "uuid";
import {
    changeTodolistTitleAC,
    filteredTodolistTasksAC,
    InitialTodolistsStateType,
    todolistsReducer
} from "./todolists-reducer";


let startState: InitialTodolistsStateType;
let todolistId1: string;
let todolistId2: string;

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: 'todo 1', filter: 'all'},
        {id: todolistId2, title: 'todo 2', filter: 'all'}
    ];
});

test('add todolist should be correct', () => {

    const endState = todolistsReducer(startState, {type: 'ADD-TODOLIST',title: '11111111111', id: v1()});

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe('11111111111');
});


test('remove todolist should be correct', () => {

    const endState = todolistsReducer(startState, {type: 'REMOVE-TODOLIST', id: todolistId1});

    expect(endState.length).toBe(1);
    expect(endState[0].title).toBe('todo 2');
});


test('change todolist title should be correct', () => {
    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId1, 'update title'));

    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe('update title');
});


test('switch filter todolist tasks should be correct', () => {

    const endState = todolistsReducer(startState, filteredTodolistTasksAC(todolistId1, 'active'));

    expect(endState[0].filter).toBe('active');
    expect(endState[1].filter).toBe('all');
});