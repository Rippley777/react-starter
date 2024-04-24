import React, { useState } from 'react';
import Button from '../../../components/buttons';

function AddTodo({ onAddTodo }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text) return;
        onAddTodo({ text, completed: false });
        setText('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input className="p-3 rounded-md" type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Add new todo" />
            <Button>Add</Button>
        </form>
    );
}

export default AddTodo;
