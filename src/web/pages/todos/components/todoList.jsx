import React from 'react';
import TodoItem from './todoItem';

function TodoList({ todos, onDeleteTodo }) {
    return (
        <ul display="flex justify-right">
            {todos.map(todo => (
                <TodoItem key={todo._id} todo={todo} onDelete={onDeleteTodo} />
            ))}
        </ul>
    );
}

export default TodoList;
