import React, {useCallback, useReducer} from 'react';
import './App.css';
import Todolist from "./Todolsit";
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, ThemeProvider, Toolbar, Typography} from "@mui/material";
import {Menu} from '@mui/icons-material';
import {createTheme} from "@mui/material/styles";
import {
    addTaskAC,
    changeTaskStatus,
    InitialTasksStateType,
    removeTaskAC,
    tasksReducer,
    updateTaskTitleAC
} from "./state/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistTitleAC,
    filteredTodolistTasksAC, InitialTodolistsStateType,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "./state/store";

export type TaskType = {id: string, title: string, isDone: boolean};
export type TasksType = Array<TaskType>;
export type FilterType = 'all' | 'active' | 'completed';

export type TodolistType = {
    id: string,
    title: string
    filter: FilterType
}

export type TodolistsType = Array<TodolistType>;


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
    },
});

function AppWithRedux() {

    console.log('AppWithRedux is called');


    const tasks1 = useSelector<AppStoreType, InitialTasksStateType>((state) => state.tasks);
    const todolists = useSelector<AppStoreType, InitialTodolistsStateType>((state) => state.todolists);
    const dispatch = useDispatch();

    // const todolistId1 = v1();
    // const todolistId2 = v1();

    // const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
    //     {id: todolistId1, title: 'todo 1', filter: 'all'},
    //     {id: todolistId2, title: 'todo 2', filter: 'all'}
    // ]);
    //
    // let [tasks1, dispatchTasks1] = useReducer(tasksReducer, {
    //     [todolistId1]: [
    //         {id: v1(), title: 'position 1', isDone: false},
    //         {id: v1(), title: 'position 2', isDone: true},
    //         {id: v1(), title: 'position 3', isDone: false}
    //     ],
    //     [todolistId2]: [
    //         {id: v1(), title: 'position 1', isDone: false},
    //         {id: v1(), title: 'position 2', isDone: true},
    //         {id: v1(), title: 'position 3', isDone: false}
    //     ]
    // });




    const removeTask = useCallback(function(todolistId: string, id: string) {
        //tasks1[todolistId] = tasks1[todolistId].filter( t => t.id !== id);
        //setTasks1({...tasks1});

        dispatch(removeTaskAC(todolistId, id));
    }, []);

    const addTask = useCallback((todolistId: string ,title: string) => {
        // tasks1[todolistId] = [{id: v1(), title: title, isDone: false}, ...tasks1[todolistId]];
        // setTasks1({...tasks1});
        // // setTasks1([...tasks1, {id: v1(), title: title, isDone: false}]);

        dispatch(addTaskAC(todolistId, title));
    }, []);

    const changeChecked = useCallback(function(todolistId:string ,id: string, newValue: boolean) {
        // tasks1[todolistId] = tasks1[todolistId].map( t => t.id !== id ? t : {...t, isDone: newValue});
        // setTasks1({...tasks1});
        // // setTasks1( tasks1.map( t => t.id !== id ? t : {...t, isDone: newValue}) );

        dispatch(changeTaskStatus(todolistId, id, newValue));
    }, []);

    const changeTaskTitle = useCallback(function(newTitle: string, todolistId: string, id: string) {
        // let task = tasks1[todolistId].find( t => t.id === id);
        // if (task) {
        //     task.title = newTitle;
        // }
        //
        // setTasks1({...tasks1});

        dispatch(updateTaskTitleAC(todolistId, id, newTitle));
    }, []);

    const addTdlst = useCallback((title: string) => {
            // const todolistId = v1();
            // setTodolists([{id: todolistId, title, filter: 'all'} , ...todolists]);
            // setTasks1({[todolistId]: [], ...tasks1});

            let action = addTodolistAC(title);
            //dispatch(action);
            dispatch(action);
    }, [])

    const removeTodolist = useCallback((id: string) => {
        // todolists = todolists.filter( td => td.id !== id );
        // setTodolists([...todolists]);
        // delete tasks1[id];
        // setTasks1({...tasks1});

        //dispatch(removeTodolistAC(id));
        dispatch(removeTodolistAC(id));
    }, [])

    const changeTodolistTitle = useCallback(function(newTitle: string, id: string) {
        // let todolist = todolists.find( td => td.id === id);
        // if(todolist) {
        //     todolist.title = newTitle;
        // }
        // setTodolists([...todolists]);

        dispatch(changeTodolistTitleAC(id, newTitle));
    }, []);

    const filteredTask = useCallback(function(id: string, filter: FilterType) {
        // let tdl = todolists.find(td => td.id === todolistId);
        // if(tdl) {
        //     tdl.filter = value;
        //     setTodolists([...todolists]);
        //
        // }

        dispatch(filteredTodolistTasksAC(id, filter));

    }, []);


    return (
        <div className="App">

            <ThemeProvider theme={theme}>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar  position="static">
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <Menu />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                News
                            </Typography>
                            <Button color="inherit">Login</Button>
                        </Toolbar>
                    </AppBar>
                </Box>
            </ThemeProvider>

            <Container fixed>

                <Grid container style={{padding: "20px", alignItems: "center"}}>
                    <AddItemForm addItem={addTdlst}  />
                </Grid>


                <Grid container spacing={4}>
                    {
                        todolists.map( (td) => {

                            let filteredAllTask = tasks1[td.id];

                            return <Grid item>
                                <Todolist
                                    key={td.id}
                                    id={td.id}
                                    title={td.title}
                                    tasks={filteredAllTask}
                                    filteredTask={filteredTask}
                                    removeTask={removeTask}
                                    addTask={addTask}
                                    changeChecked={changeChecked}
                                    filter={td.filter}
                                    changeTodolistTitle={changeTodolistTitle}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                />
                            </Grid>
                        })
                    }
                </Grid>

            </Container>
        </div>
    );
}

export default AppWithRedux;
