import React, { useEffect, useState } from "react";
import db from "../firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";


const CalendarView = ({ onDateClick }) => {
  const today = new Date().toISOString().slice(0, 10);

  const getDaysOfMonth = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const dateList = [];

    for (let i = 1; i <= days; i++) {
      const day = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      dateList.push(day);
    }

    return dateList;
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 15, borderRadius: 8 }}>
      <h3 style={{ marginBottom: 15, textAlign: "center" }}>Selecciona una fecha</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
        {getDaysOfMonth().map((day) => (
          <div
            key={day}
            onClick={() => onDateClick(day)}
            style={{
              width: 38,
              height: 38,
              backgroundColor: day === today ? "#4caf50" : "#e0e0e0",
              color: day === today ? "white" : "#333",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 6,
              cursor: "pointer",
              userSelect: "none",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => {
              if (day !== today) e.currentTarget.style.backgroundColor = "#a5d6a7";
            }}
            onMouseLeave={(e) => {
              if (day !== today) e.currentTarget.style.backgroundColor = "#e0e0e0";
            }}
            title={day}
          >
            {day.slice(-2)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;
