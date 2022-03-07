import {v1} from "uuid";
import {
    addTaskAC,
    changeTaskStatus,
    InitialTasksStateType,
    removeTaskAC,
    tasksReducer,
    updateTaskTitleAC
} from "./tasks-reducer";


let todolistId1:string;
let todolistId2:string;
let startState: InitialTasksStateType = {};


beforeEach(() => {

    todolistId1 = v1();
    todolistId2 = v1();

    startState = {
            [todolistId1]: [
                {id: '14', title: 'position 1', isDone: false},
                {id: '15', title: 'position 2', isDone: true},
                {id: '17', title: 'position 3', isDone: false}
            ],
            [todolistId2]: [
                {id: '1', title: 'position 1', isDone: false},
                {id: '2', title: 'position 2', isDone: true},
                {id: '3', title: 'position 3', isDone: false}
            ]
        }
});


test('add task should be correct', () => {
    let endState = tasksReducer(startState, addTaskAC(todolistId1, 'new text'));

    expect(endState[todolistId1].length).toBe(4);
    expect(endState[todolistId1][3].title).toBe('new text');
    expect(endState[todolistId2].length).toBe(3);
});


test('remove task should be correct', () => {
    let endState = tasksReducer(startState, removeTaskAC(todolistId2, '3'));

    expect(endState[todolistId2].length).toBe(2);
    expect(endState[todolistId1].length).toBe(3);
});

test('change task title should be correct', () => {
    const newTitle = 'update';
    let endState = tasksReducer(startState, updateTaskTitleAC(todolistId2, '3', newTitle));

    expect(endState[todolistId2][2].title).toBe(newTitle);
})

test('change task status should be correct', () => {
    let endState = tasksReducer(startState, changeTaskStatus(todolistId2,'3', true));

    expect(endState[todolistId2][2].isDone).toBeTruthy();
    //expect(endState[todolistId2][1].isDone).toBeFalsy();
})