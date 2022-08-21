import { InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import TaskIcon from '@mui/icons-material/Task';
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import { useResultContext } from '../context/Context';
import React, { useState } from 'react';

const TodoBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
}));

export const CreateTodoBox: React.FC = () => {
    const [title, setTitle] = useState('');
    const { addTodo, todos } = useResultContext();

    const handleCreateTodo = (e: React.KeyboardEvent<HTMLDivElement>) => { // создание заметки по нажатию на Enter
        if (e.charCode === 13 && title.length > 0) {
            addTodo({ id: todos.length + 1, title, description: '', status: false });
            setTitle('');
        }
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    return (
        <TodoBox>
            <InputBase
                sx={{ width: '60%' }}
                onKeyPress={handleCreateTodo}
                value={title}
                onChange={handleTitleChange}
                placeholder="Создать задачу"
                inputProps={{ 'aria-label': 'search' }}
            />
            <Box>
                <TaskIcon sx={{ marginRight: '10px', cursor: 'not-allowed! important' }} />
                <EditIcon sx={{ marginRight: '10px', cursor: 'not-allowed! important' }} />
                <ImageIcon sx={{ marginRight: '10px', cursor: 'not-allowed! important' }} />
            </Box>
        </TodoBox>
    );
};
