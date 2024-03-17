import React, { useState, useEffect } from "react";
import "./App.css";
import Column from "./Component/Column";
import AddTask from "./Component/AddTask";
import TaskCard from "./Component/TaskCard";
import Heading from "./Component/Heading";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks
      ? JSON.parse(savedTasks)
      : {
          todo: [
            {
              taskId: 1,
              taskName: "Sample Task 1",
              description: "Provide Description",
            },
            {
              taskId: 2,
              taskName: "Sample Task 2",
              description: "Provide Description",
            },
          ],
          inProgress: [],
          review: [],
          done: [],
        };
  });

  const [newTask, setNewTask] = useState("");
  const [taskId, setTaskId] = useState(() => {
    const savedTaskId = localStorage.getItem("taskId");
    return savedTaskId ? parseInt(savedTaskId, 10) : 4;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("taskId", taskId);
  }, [taskId]);

  const moveTask = (taskIndex, source, destination) => {
    const taskToMove = tasks[source][taskIndex];
    console.log("Task to move:", taskToMove);
    console.log("Source:", source);
    console.log("Destination:", destination);
    
    // Remove the task from the source column
    const updatedSourceTasks = tasks[source].filter((_, index) => index !== taskIndex);
  
    // Append the task to the destination column
    const updatedDestinationTasks = [...tasks[destination], taskToMove];
  
    // Update the tasks state
    setTasks(prevTasks => ({
      ...prevTasks,
      [source]: updatedSourceTasks,
      [destination]: updatedDestinationTasks,
    }));
  };
  const addNewTask = () => {
    if (newTask.trim() !== "") {
      const updatedTask = {
        taskId: taskId,
        taskName: newTask,
        description: "Task is the unit",
      };
      setTasks((prevTasks) => ({
        ...prevTasks,
        todo: [...prevTasks.todo, updatedTask],
      }));
      setNewTask("");
      setTaskId(taskId + 1);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addNewTask();
    }
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const handleDrop = (e, targetColumn) => {
    const taskId = e.dataTransfer.getData("taskId");
    let sourceColumn = '';
  
    // Iterate over each column to find the source column
    Object.keys(tasks).some(columnKey => {
      if (tasks[columnKey].find(task => task.taskId.toString() === taskId)) {
        sourceColumn = columnKey;
        return true;
      }
      return false;
    });
  
    // Move the task only if the source column is different from the target column
    if (sourceColumn !== targetColumn) {
      moveTask(
        tasks[sourceColumn].findIndex(task => task.taskId.toString() === taskId),
        sourceColumn,
        targetColumn
      );
    }
  };
  
  const allowDrop = (e) => {
    e.preventDefault();
  };

  return (
    <div className="App">
      <Heading/>
      <div className="board">
        <Column
          title="To Do"
          tasks={tasks.todo}
          onDrop={handleDrop}
          onDragOver={allowDrop}
          onCardClick={(index) => moveTask(index, "todo", "inProgress")}
          onCardDragStart={handleDragStart}
        />
        <Column
          title="In Progress"
          tasks={tasks.inProgress}
          onDrop={handleDrop}
          onDragOver={allowDrop}
          onCardClick={(index) => moveTask(index, "inProgress", "review")}
          onCardDragStart={handleDragStart}
        />
        <Column
          title="Review"
          tasks={tasks.review}
          onDrop={handleDrop}
          onDragOver={allowDrop}
          onCardClick={(index) => moveTask(index, "review", "done")}
          onCardDragStart={handleDragStart}
        />
        <Column
          title="Done"
          tasks={tasks.done}
          onDrop={handleDrop}
          onDragOver={allowDrop}
          onCardClick={(index) => console.log("Click on Done")}
          onCardDragStart={handleDragStart}
        />
      </div>
      <AddTask
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyPress={handleKeyPress}
        onClick={addNewTask}
      />
    </div>
  );
};

export default App;
