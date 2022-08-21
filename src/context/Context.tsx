import { TodoContextType, ITodo } from '../types/todos';
import { createContext, FC, ReactNode, useContext, useState } from 'react';

const ResultContext = createContext<TodoContextType | null>(null);

interface ContextProps {
    children: ReactNode;
}

export const ResultContextProvider: FC<ContextProps> = ({ children }) => {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [searchValue, setSearchValue] = useState('');
    console.log(todos)
    const editTodo = (todo: ITodo) => {
        // редактирование заметки, еще не реализовано полностью
        const { id, title, description, status } = todo;
        const newTodos = todos
            .map((todo) => {
                if (todo.id === id) {
                    return { ...todo, title, description, status };
                }
                return todo;
            })
            .sort((a, b) => a.id - b.id);
        setTodos(newTodos);
    };

    const deleteTodo = (id: number) => {
        // удаление заметки по айди
        const newTodos = todos.filter((todo) => todo.id !== id);
        setTodos(newTodos);
    };
    const addTodo = (todo: ITodo) => {
        // добавление заметки в массив
        const { id, title, description, status } = todo;
        const newTodo = { id, title, description, status };
        setTodos([...todos, newTodo]);
    };

    return (
        <ResultContext.Provider value={{ todos, editTodo, deleteTodo, addTodo, searchValue, setSearchValue }}>
            {children}
        </ResultContext.Provider>
    );
};

export const useResultContext = () => useContext(ResultContext) as TodoContextType;
