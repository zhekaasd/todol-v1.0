import styles from "./todolist.module.css";
import EditableSpan from "./EditableSpan";
import React, {useCallback} from "react";
import {TaskType} from "./App";
import {Checkbox} from "@mui/material";

type TaskPropsType = {
    t: TaskType
    id: string
    changeTaskTitle: (newTitle: string, todolistId: string, id: string) => void
    changeChecked: (todolistId: string, id: string, newValue: boolean) => void
    removeTask: (id: string, todolistId: string) => void
}
const Task: React.FC<TaskPropsType> = ({t, id, changeTaskTitle, changeChecked, removeTask}) => {
    console.log('task is called')

    const removeTaskItem = useCallback(() => {
        removeTask(id, t.id);
    }, [id, t.id, removeTask]);

    const changeTitleItem = useCallback((newTitle: string) => {
        changeTaskTitle(newTitle, id, t.id);
    }, [t.id, id, changeTaskTitle]);

    const changeCheckboxHandler = useCallback(() => {changeChecked(id ,t.id, !t.isDone)}, [changeChecked, t.id, t.isDone, id]);

    return <div  style={{listStyleType: "none"}} className={t.isDone ? styles.isDone : ''} >
        <Checkbox size={"small"} checked={t.isDone} onChange={changeCheckboxHandler} />
        <EditableSpan title={t.title}  changeTitle={changeTitleItem} removeItem={removeTaskItem} />
    </div>
}


export default React.memo(Task);