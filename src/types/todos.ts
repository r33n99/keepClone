export interface ITodo {
    id: number;
    title: string;
    description: string;
    status: boolean;
  }
  export type TodoContextType = {
    todos: ITodo[];
    searchValue: string;
    setSearchValue: (value: string) => void;
    editTodo: (todo: ITodo) => void;
    deleteTodo: (id: number) => void;
    addTodo:(todo: ITodo) => void;
  };