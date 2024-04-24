import { FaTrashCan } from "react-icons/fa6";

function TodoItem({ todo, onDelete }) {
    return (
        <li>
            {todo.text} <button className="ml-5" onClick={() => onDelete(todo._id)}><FaTrashCan /></button>
        </li>
    );
}

export default TodoItem;
