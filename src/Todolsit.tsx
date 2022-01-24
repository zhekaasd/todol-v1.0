import React, {useState} from "react";
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

    const addTask = (value: string) => {
      props.addTask(props.id, value);
    }

    const changeTdlsTitle = (newTitle: string) => {
        props.changeTodolistTitle(newTitle, props.id);
    }

    const removeTdlst = () => {
        props.removeTodolist(props.id);
    }


    const onAllClickHandler = () => {props.filteredTask(props.id, 'all');}
    const onActiveClickHandler = () => {props.filteredTask(props.id, 'active');}
    const onCompletedHandler = () => {props.filteredTask(props.id, 'completed');}


    return <div>
        <h3 style={{display: "flex", alignItems: "center"}}>
            <EditableSpan
                title={props.title}
                //spanClassName={styles.todoSpan}
                nameButton={'del'}
                changeTitle={changeTdlsTitle}
                removeItem={removeTdlst}
            />
        </h3>
        <AddItemForm addItem={addTask}  />
        <div style={{marginLeft: '0', paddingLeft: '0'}}>
            {
                props.tasks.map((t) => {

                    const changeTitle = (newTitle: string) => {
                      props.changeTaskTitle(newTitle, props.id, t.id);
                    }

                    return <Task t={t} key={t.id} id={props.id} removeTask={props.removeTask} changeChecked={props.changeChecked} changeTitle={changeTitle} />
                })
            }
        </div>
        <div>
            // Button to custom color
            {/*<ThemeProvider theme={theme}>*/}
            {/*    <Button color={'primary'} size={'small'} variant={'contained'} className={props.filter === 'all' ? styles.active : ''} onClick={onAllClickHandler} > All </Button>*/}
            {/*    <Button size={'small'} variant={'contained'} className={props.filter === 'active' ? styles.active : ''} onClick={onActiveClickHandler} > Active </Button>*/}
            {/*    <Button size={'small'} variant={'contained'} className={props.filter === 'completed' ? styles.active : ''} onClick={onCompletedHandler} > Completed </Button>*/}
            {/*</ThemeProvider>*/}
            <Button size={'small'} color={"success"} variant={props.filter === 'all' ? 'contained' : 'outlined'}  onClick={onAllClickHandler} > All </Button>
            <Button size={'small'} color={'secondary'} variant={props.filter === 'active' ? 'contained' : 'outlined'}  onClick={onActiveClickHandler} > Active </Button>
            <Button size={'small'} color={'primary'} variant={props.filter === 'completed' ? 'contained' : 'outlined'}  onClick={onCompletedHandler} > Completed </Button>
        </div>
    </div>
}

export default Todolist;