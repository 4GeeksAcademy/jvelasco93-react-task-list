import React, { useState, useRef } from "react";

export function TaskInput({ onAddTask }) {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const isEmpty = value.trim() === "";

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (isEmpty) return;
    onAddTask(value.trim());
    setValue("");
    inputRef.current.focus();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        className="text-input"
        placeholder="New task..."
        autoFocus
      />
      <button type="submit" disabled={isEmpty}>
        Add
      </button>
    </form>
  );
}
