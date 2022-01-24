import {useState} from "react";
import { v1 } from "uuid";
import {TodolistsType} from "../App";
import {filteredTodolistTasksAC, todolistReducer} from "./todolist-reducer";


test('add todolist should be correct', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const startState: TodolistsType = [
        {id: todolistId1, title: 'todo 1', filter: 'all'},
        {id: todolistId2, title: 'todo 2', filter: 'all'}
    ];

    const endState = todolistReducer(startState, {type: 'ADD-TODOLIST',title: '11111111111'});

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe('11111111111');
});


test('remove todolist should be correct', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const startState: TodolistsType = [
        {id: todolistId1, title: 'todo 1', filter: 'all'},
        {id: todolistId2, title: 'todo 2', filter: 'all'}
    ];

    const endState = todolistReducer(startState, {type: 'REMOVE-TODOLIST', id: todolistId1});

    expect(endState.length).toBe(1);
    expect(endState[0].title).toBe('todo 2');
});


test('change todolist title should be correct', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const startState: TodolistsType = [
        {id: todolistId1, title: 'todo 1', filter: 'all'},
        {id: todolistId2, title: 'todo 2', filter: 'all'}
    ];

    const endState = todolistReducer(startState, {type: 'CHANGE-TODOLIST-TITLE', id: todolistId1, title: 'update title'});

    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe('update title');
});


test('switch filter todolist tasks should be correct', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const startState: TodolistsType = [
        {id: todolistId1, title: 'todo 1', filter: 'all'},
        {id: todolistId2, title: 'todo 2', filter: 'all'}
    ];

    const endState = todolistReducer(startState, filteredTodolistTasksAC(todolistId1, 'active'));

    expect(endState[0].filter).toBe('active');
    expect(endState[1].filter).toBe('all');
});