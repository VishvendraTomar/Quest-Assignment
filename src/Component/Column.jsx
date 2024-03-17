import React from "react";
import TaskCard from "./TaskCard";

const Column = ({ title, tasks, onDrop, onDragOver, onCardClick, onCardDragStart }) => {
  return (
    <div className={`column ${title.toLowerCase()}`} onDrop={(e) => onDrop(e, title.toLowerCase())} onDragOver={onDragOver}>
      <h2>{title}</h2>
      <div className="cards">
        {tasks.map((task, index) => (
          <TaskCard
            key={task.taskId}
            task={task}
            onDragStart={onCardDragStart}
            onClick={() => onCardClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
