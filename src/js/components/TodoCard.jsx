import React from "react";

export function TodoCard({ children }) {
  return (
    <div style={{ width: "400px" }}>
      <div>
        <h1 style={{ fontSize: "5rem", letterSpacing: "-0.125em" }}>todo</h1>
        {children}
      </div>
    </div>
  );
}
