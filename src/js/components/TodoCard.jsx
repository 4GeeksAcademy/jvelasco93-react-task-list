import React from "react";

export function TodoCard({ children }) {
  return (
    <div className="card shadow pb-2" style={{ width: "400px" }}>
      <div className="card-body">
        <h1
          className="text-center font-monospace m-0 mb-3"
          style={{ fontSize: "5rem", letterSpacing: "-0.125em" }}
        >
          todo
        </h1>
        {children}
      </div>
    </div>
  );
}
