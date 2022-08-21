import styled from '@emotion/styled';
import { Box, InputBase, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import { ITodo } from '../types/todos';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useResultContext } from '../context/Context';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
const ListBox = styled(Box)(() => ({
    border: '1px solid #e0e0e0',
    marginRight: '15px',
    marginBottom: '15px',
    padding: '15px',
    borderRadius: '10px',
    maxWidth: '300px',
    minWidth: '150px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'center',
    wordBreak:"break-all",
}));

export const ListItem: FC<ITodo> = ({ id, title, description, status }) => {
    const [editMode, setEditMode] = useState(false);
    const { deleteTodo, editTodo } = useResultContext();
    const [titleValue, setTitleValue] = useState(title);
    const [editStatus, setEditStatus] = useState(status);
    console.log(editMode);
    const handleDelete = () => {
        // передаем айди на удаление в контекст
        deleteTodo(id);
    };

    const handleEditValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.target.value);
    };
    const handleChangeTitle = () => {
        editTodo({ id, title: titleValue, description, status: editStatus });
        setEditMode(false);
    };

    const handleTurnEditMode = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
        if (e.detail === 2) {
            setEditMode(true);
        }
    };

    const handleChangeStatus = () => {
        setEditStatus(!editStatus);
        handleChangeTitle();
    };

    return (
        <ListBox>
            {editMode ? (
                <InputBase
                    autoFocus={true}
                    onBlur={handleChangeTitle}
                    sx={{ textAlign: 'center' }}
                    value={titleValue}
                    onChange={handleEditValue}
                />
            ) : (
                <Typography onClick={handleTurnEditMode} variant="h3">
                    {title}
                </Typography>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', marginTop: '10px' }}>
                {editMode ? (
                    <CheckCircleIcon
                        onClick={handleChangeTitle}
                        sx={{ color: 'green', width: '35px', cursor: 'pointer' }}
                    />
                ) : (
                    <>
                        {editStatus ? (
                            <CloseIcon
                                sx={{ color: 'red', cursor: 'pointer', width: '40px' }}
                                onClick={handleChangeStatus}
                            />
                        ) : (
                            <DoneIcon
                                sx={{ color: 'green', cursor: 'pointer', width: '40px' }}
                                onClick={handleChangeStatus}
                            />
                        )}
                    </>
                )}
                <DeleteForeverIcon sx={{ cursor: 'pointer', color: 'red' }} onClick={handleDelete} />
            </Box>
        </ListBox>
    );
};
