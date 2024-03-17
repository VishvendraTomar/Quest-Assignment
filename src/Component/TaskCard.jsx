import React from "react";

const TaskCard = ({ task, onDragStart, onClick }) => {
  return (
    <div
      className="card"
      key={task.taskId}
      draggable
      onDragStart={(e) => onDragStart(e, task.taskId)}
      onClick={onClick}
    >
      <p>Task: {task.taskName}</p>
      <p>Description: {task.description}</p>
    </div>
  );
};

export default TaskCard;
