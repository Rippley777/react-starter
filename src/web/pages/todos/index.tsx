import { useState, useEffect } from 'react';
import TodoList from './components/todoList';
import AddTodo from './components/addTodo';
import Page from '../../components/layout/page';

const todoApiUrl = `${process.env.REACT_APP_API_URL}/api/todos`;

function Todos() {
  const [todos, setTodos] = useState<any>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch(todoApiUrl);
    const data = await response.json();
    setTodos(data);
  };

  const addTodo = async (todo: any) => {
    const response = await fetch(todoApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    });
    const newTodo = await response.json();
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = async (id: any) => {
    await fetch(`${todoApiUrl}/${id}`, {
      method: 'DELETE',
    });
    setTodos(todos.filter((todo: any) => todo._id !== id));
  };

  return (
    <Page>
      <div className="w-full">
        <h1 className="text-xl font-bold">Todo List</h1>
        <AddTodo onAddTodo={addTodo} />
        <TodoList todos={todos} onDeleteTodo={deleteTodo} />
      </div>
    </Page>
  );
}

export default Todos;
