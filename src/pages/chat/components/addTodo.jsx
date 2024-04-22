import React, { useState } from 'react';

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
            <button className="py-2 px-4 rounded-full text-white m-5 bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300" type="submit">Add</button>
        </form>
    );
}

export default AddTodo;
