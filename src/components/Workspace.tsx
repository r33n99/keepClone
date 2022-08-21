import { Box, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { FC } from 'react';
import { useResultContext } from '../context/Context';
import { CreateTodoBox } from './CreateTodoBox';
import { ListItem } from './ListItem';

export const Workspace: FC = () => {
    const { todos, searchValue } = useResultContext();
    const newTodos = todos.filter((todo) => todo.title.toLowerCase().includes(searchValue.toLocaleLowerCase())); // поиск по заголовку и вывод отфильтрованных заметок
    return (
        <Container sx={{ display: 'flex', flexDirection: 'column' }}>
            <CreateTodoBox />
            <Box sx={{ marginTop: '30px', display: 'flex', flexWrap: 'wrap' }}>
                {!newTodos.length ? <Typography sx={{textAlign:"center"}} variant="h2" >Заметки отсутствуют</Typography> : newTodos.map((todo) => (
                    <ListItem key={todo.id} {...todo} />
                ))}
            </Box>
        </Container>
    );
};
