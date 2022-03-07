import styles from "./todolist.module.css";
import EditableSpan from "./EditableSpan";
import React from "react";
import {TaskType} from "./App";
import {Checkbox} from "@mui/material";

type TaskPropsType = {
    t: TaskType
    id: string
    changeTitle: (newTitle: string) => void
    changeChecked: (todolistId: string, id: string, newValue: boolean) => void
    removeTask: (id: string, todolistId: string) => void
}
const Task: React.FC<TaskPropsType> = ({t, id, changeTitle, changeChecked, removeTask}) => {

    const removeTaskItem = () => {
        removeTask(id, t.id);
    }

    return <div  style={{listStyleType: "none"}} className={t.isDone ? styles.isDone : ''} >
        <Checkbox size={"small"} checked={t.isDone} onChange={() => {
            changeChecked(id ,t.id, !t.isDone);
        }} />
        <EditableSpan title={t.title}  changeTitle={changeTitle} removeItem={removeTaskItem} />
    </div>
}


export default Task;