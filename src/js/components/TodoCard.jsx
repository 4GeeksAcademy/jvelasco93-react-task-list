import React from "react";

export function TodoCard({ children }) {
  return (
    <div>
      <div>
        <h1>todo</h1>
        {children}
      </div>
    </div>
  );
}
