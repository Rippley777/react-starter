import { FaTrashCan } from 'react-icons/fa6';

function TodoItem({ todo, onDelete }) {
  return (
    <div className="flex justify-between py-3 border-b border-gray-300 border-solid">
      {todo.text}{' '}
      <button className="ml-5 text-gray-400" onClick={() => onDelete(todo._id)}>
        <FaTrashCan />
      </button>
    </div>
  );
}

export default TodoItem;
