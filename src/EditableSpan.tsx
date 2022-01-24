import React, {ChangeEvent, useState} from "react";

import s from "./EditableSpan.module.css";
import {IconButton, TextField} from "@mui/material";
import {Clear} from "@mui/icons-material";
import {pink} from "@mui/material/colors";

type EditableSpanType = {
    nameButton: string
    title: string
    spanClassName?: string
    changeTitle: (newTitle: string) => void
    removeItem: () => void

}
const EditableSpan: React.FC<EditableSpanType> = ({nameButton, title, spanClassName, changeTitle, removeItem}) => {

    let [editMode, setEditMode] = useState<boolean>(false);
    let [titleValue, setTitleValue] = useState<string>(title);


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.currentTarget.value);
    }


    const editActiveMode = () => {
        setEditMode(true);
    }

    const editDeactivatedMode = () => {
        if(titleValue.trim() === '') {
            setTitleValue(title);
            setEditMode(false);
        } else {
            changeTitle(titleValue);
            setEditMode(false);
        }
    }

    /*  */
     return editMode ? <TextField  onChange={onChangeHandler} value={titleValue} autoFocus onBlur={editDeactivatedMode}  size={'small'} />
         : <>
            <span className={spanClassName ? spanClassName : s.taskSpan}  onDoubleClick={editActiveMode}>{title}</span>

             <IconButton onClick={removeItem}>
                 <Clear  fontSize={'medium'} sx={{ color: '#F58F7C' }} />
             </IconButton>
         </>
}

export default EditableSpan;