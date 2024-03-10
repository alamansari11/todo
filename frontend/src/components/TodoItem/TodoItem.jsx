import React from "react";
import { MdDelete } from "react-icons/md";
import "./TodoItem.css"

const TodoItem = ({
  title,
  description,
  isCompleted,
  updateHandler,
  deleteHandler,
  id,
}) => {
  return (
    <div className="todo">
      <div className="todo__content">
        <h4 className="todo__title">{title}</h4>
        <p className="todo__description">{description}</p>
      </div>
      <div className="todoaction">
        <input
          onChange={() => updateHandler(id)}
          type="checkbox"
          checked={isCompleted}
        />
        <button onClick={() => deleteHandler(id)} className="btn">
        <MdDelete size={25} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
