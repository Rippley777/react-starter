import React from 'react';
import TodoItem from './todoItem';

function TodoList({ todos, onDeleteTodo }) {
  return (
    <div className="mt-5 p-5 bg-white">
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} onDelete={onDeleteTodo} />
      ))}
    </div>
  );
}

export default TodoList;
