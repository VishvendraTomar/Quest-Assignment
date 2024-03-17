import React from "react";

const AddTask = ({ value, onChange, onKeyPress, onClick }) => {
  return (
    <div className="add-card">
      <input
        type="text"
        placeholder="Add new task"
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <button onClick={onClick}>Add</button>
    </div>
  );
};

export default AddTask;
