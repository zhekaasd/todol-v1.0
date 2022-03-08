import React, {useCallback, useState} from "react";
import {FilterType, TasksType} from "./App";

import s from "./todolist.module.css";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import Task from "./Task";
import Button from "@mui/material/Button";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import { green } from "@mui/material/colors";

type TodolistPropsType = {
    title: string
    tasks: TasksType
    filteredTask: (id: string, value: FilterType) => void
    removeTask: (id: string, todolistId: string) => void
    addTask: (todolistId: string, title: string) => void
    changeChecked: (todolistId: string, id: string, newValue: boolean) => void
    filter: FilterType
    id: string
    removeTodolist: (id: string) => void
    changeTodolistTitle: (newTitle: string, id: string) => void
    changeTaskTitle: (newTitle: string, todolistId: string, id: string) => void
}

/*--- Custom theme to button color ---*/
const theme = createTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: '#4F4F51',
        },
        secondary: {
            // This is green.A700 as hex.
            main: '#11cb5f',
        },
        info: {
            main: green[500],
        }
    },
});

function Todolist(props: TodolistPropsType) {
    console.log('Todolist is called!');


    let tasks = props.tasks;

    if (props.filter === 'active') {
        tasks = props.tasks.filter( t => !t.isDone);
    }

    if (props.filter === 'completed') {
        tasks = props.tasks.filter( t => t.isDone );
    }


    const addTask = useCallback((value: string) => {
        props.addTask(props.id, value);
    }, []);

    const changeTdlsTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.id);
    }, [props.changeTodolistTitle, props.id]);

    const removeTdlst = useCallback( () => {
        props.removeTodolist(props.id);
    }, [props.removeTodolist, props.id]);


    const onAllClickHandler = useCallback(() => {props.filteredTask(props.id, 'all');}, [props.filteredTask, props.id]);
    const onActiveClickHandler = useCallback(() => {props.filteredTask(props.id, 'active')}, [props.filteredTask, props.id]);
    const onCompletedHandler = useCallback(() => {props.filteredTask(props.id, 'completed');}, [props.filteredTask, props.id]);


    return <div>
        <h3 style={{display: "flex", alignItems: "center"}}>
            <EditableSpan
                title={props.title}
                //spanClassName={styles.todoSpan}
                changeTitle={changeTdlsTitle}
                removeItem={removeTdlst}
            />
        </h3>
        <AddItemForm addItem={addTask}  />
        <div style={{marginLeft: '0', paddingLeft: '0'}}>
            {
                tasks.map((t) => {


                    return <Task t={t} key={t.id} id={props.id} removeTask={props.removeTask} changeChecked={props.changeChecked} changeTaskTitle={props.changeTaskTitle} />
                })
            }
        </div>
        <div>
            {/*<ThemeProvider theme={theme}>*/}
            {/*    <Button color={'primary'} size={'small'} variant={'contained'} className={props.filter === 'all' ? styles.active : ''} onClick={onAllClickHandler} > All </Button>*/}
            {/*    <Button size={'small'} variant={'contained'} className={props.filter === 'active' ? styles.active : ''} onClick={onActiveClickHandler} > Active </Button>*/}
            {/*    <Button size={'small'} variant={'contained'} className={props.filter === 'completed' ? styles.active : ''} onClick={onCompletedHandler} > Completed </Button>*/}
            {/*</ThemeProvider>*/}

            {
                props.tasks.length > 0 ? <>
                    <Button size={'small'} color={"success"} variant={props.filter === 'all' ? 'contained' : 'outlined'}  onClick={onAllClickHandler} > All </Button>
                    <Button size={'small'} color={'secondary'} variant={props.filter === 'active' ? 'contained' : 'outlined'}  onClick={onActiveClickHandler} > Active </Button>
                    <Button size={'small'} color={'primary'} variant={props.filter === 'completed' ? 'contained' : 'outlined'}  onClick={onCompletedHandler} > Completed </Button>
                </> : ''
            }

        </div>
    </div>
}

export default React.memo(Todolist);