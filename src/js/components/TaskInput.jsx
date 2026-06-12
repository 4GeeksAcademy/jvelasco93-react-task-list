import React, { useState, useRef } from "react";

export function TaskInput({ onAddTask }) {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  const isEmpty = value.trim() === "";

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") submit();
  }

  function submit() {
    if (isEmpty) return;
    onAddTask(value.trim());
    setValue("");
    inputRef.current.focus();
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="text-input"
        placeholder="New task..."
        autoFocus
      />
      <button type="button" onClick={submit} disabled={isEmpty}>
        Add
      </button>
    </div>
  );
}
