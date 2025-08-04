import React, { useEffect, useState } from "react";
import db from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const DailyLogModal = ({ date, onClose }) => {
  const [habits, setHabits] = useState([]);
  const [logs, setLogs] = useState({}); // { habitId: docId }

  useEffect(() => {
    if (!date) return;

    // Cargar hábitos
    const fetchHabits = async () => {
      const q = query(collection(db, "habits"));
      const snapshot = await getDocs(q);
      setHabits(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    // Cargar logs del día seleccionado
    const fetchLogs = async () => {
      const q = query(collection(db, "habit_logs"), where("date", "==", date));
      const snapshot = await getDocs(q);
      const logsMap = {};
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        logsMap[data.habitId] = doc.id;
      });
      setLogs(logsMap);
    };

    fetchHabits();
    fetchLogs();
  }, [date]);

  const markDone = async (habitId) => {
    if (logs[habitId]) return;

    try {
      const docRef = await addDoc(collection(db, "habit_logs"), {
        habitId,
        date,
        completed: true,
      });
      setLogs((prev) => ({ ...prev, [habitId]: docRef.id }));
    } catch (error) {
      console.error("Error al marcar hábito:", error);
      alert("Error al marcar hábito");
    }
  };

  const unmarkDone = async (habitId) => {
    if (!logs[habitId]) return;

    try {
      await deleteDoc(doc(db, "habit_logs", logs[habitId]));
      setLogs((prev) => {
        const newLogs = { ...prev };
        delete newLogs[habitId];
        return newLogs;
      });
    } catch (error) {
      console.error("Error al desmarcar hábito:", error);
      alert("Error al desmarcar hábito");
    }
  };

  if (!date) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        padding: 20,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#fff",
          padding: 25,
          borderRadius: 10,
          width: "100%",
          maxWidth: 480,
          maxHeight: "80vh",
          overflowY: "auto",
          boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 15,
            right: 15,
            background: "none",
            border: "none",
            fontSize: 24,
            cursor: "pointer",
          }}
          aria-label="Cerrar modal"
        >
          ×
        </button>

        <h2 style={{ marginBottom: 20, textAlign: "center" }}>
          Hábitos para el día {date}
        </h2>

        {habits.length === 0 && <p>No hay hábitos registrados.</p>}

        <ul style={{ listStyle: "none", padding: 0 }}>
          {habits.map((habit) => {
            const done = Boolean(logs[habit.id]);
            return (
              <li
                key={habit.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 15,
                  padding: "8px 12px",
                  borderRadius: 6,
                  backgroundColor: done ? "#d4edda" : "#f8d7da",
                  cursor: "pointer",
                  userSelect: "none",
                }}
                onClick={() => (done ? unmarkDone(habit.id) : markDone(habit.id))}
              >
                <input
                  type="checkbox"
                  checked={done}
                  onChange={() => (done ? unmarkDone(habit.id) : markDone(habit.id))}
                  style={{ marginRight: 12 }}
                />
                <span style={{ fontWeight: "600" }}>{habit.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DailyLogModal;
