import styles from "./todolist.module.css";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import {orange, pink} from '@mui/material/colors';
import {Button, IconButton, TextField} from "@mui/material";
import {AddCircle, Clear, Delete} from "@mui/icons-material";

type AddItemFormType = {
    addItem: (value: string) => void
}


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


const AddItemForm = (props: AddItemFormType) => {

    console.log('AddItemForm is called!');

    let [error, setError] = useState<boolean>(false);
    let [currentValue, setCurrentValue] = useState('');

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentValue(e.currentTarget.value);
        e.currentTarget.value = '';
        setError(false);
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addTaskHandler();
        }
    }

    let addTaskHandler = () => {
        if (currentValue.trim() !== '') {
            props.addItem(currentValue);
            setCurrentValue('');
        } else {
            setCurrentValue('');
            setError(true);
        }
    }

    return <div style={{margin: "0 auto"}}>
        {/*<input className={error ? styles.error : ''} type={"text"}*/}
        {/*       onKeyPress={onKeyPressHandler}*/}
        {/*       onChange={onChangeHandler} value={currentValue}/>*/}

        {/* label={error ? 'Field is not correct!' : 'Send text..'} */}

        <TextField helperText={error ? 'Field is not correct!' : ''}
                   size={'small'} label={error ? 'Field is not correct!' : 'Send text..'}
                   error={error} variant={"outlined"}
                   onKeyPress={onKeyPressHandler}
                   onChange={onChangeHandler}
                   value={currentValue}
        />


        {/*<button onClick={addTaskHandler}>+</button>*/}
        {/*<ThemeProvider theme={theme} >*/}
        {/*      <Button  variant={'contained'} size={'small'}  onClick={addTaskHandler}>+</Button>*/}
        {/*</ThemeProvider>*/}

        <IconButton>
            <AddCircle
                onClick={addTaskHandler} sx={{color: pink[500]}} />
        </IconButton>

        {/*{error && <div className={styles.errorMsg}> Field is not correct! </div> }*/}
    </div>
}



export default React.memo(AddItemForm);