import { useState, useEffect } from 'react';
import TodoList from './components/todoList';
import AddTodo from './components/addTodo';
import Page from '../../components/layout/page';

function Todos() {
    const [todos, setTodos] = useState<any>([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await fetch('https://be-test-mongo-express.azurewebsites.net/api/todos');
        const data = await response.json();
        setTodos(data);
    };

    const addTodo = async (todo: any) => {
        const response = await fetch('https://be-test-mongo-express.azurewebsites.net/api/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(todo)
        });
        const newTodo = await response.json();
        setTodos([...todos, newTodo]);
    };

    const deleteTodo = async (id: any) => {
        await fetch(`https://be-test-mongo-express.azurewebsites.net/api/todos/${id}`, {
            method: 'DELETE'
        });
        setTodos(todos.filter((todo: any) => todo._id !== id));
    };

    return (
        <Page>
            <h1 className='text-xl font-bold'>Todo List</h1>
            <AddTodo onAddTodo={addTodo} />
            <TodoList todos={todos} onDeleteTodo={deleteTodo} />
        </Page>
    );
}

export default Todos;
