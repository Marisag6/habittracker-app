import React from "react";

const FilterButtons = ({ currentFilter, onChange }) => {
  return (
    <div className="filter-buttons">
      <button
        className={currentFilter === "all" ? "active" : ""}
        onClick={() => onChange("all")}
      >
        Todos
      </button>
      <button
        className={currentFilter === "completed" ? "active" : ""}
        onClick={() => onChange("completed")}
      >
        Completados
      </button>
      <button
        className={currentFilter === "pending" ? "active" : ""}
        onClick={() => onChange("pending")}
      >
        Pendientes
      </button>
    </div>
  );
};

export default FilterButtons;
