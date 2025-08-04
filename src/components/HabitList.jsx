import React, { useEffect, useState } from "react";
import db from "../firebase";
import AddHabit from "./AddHabit";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const HabitList = () => {
  const [habits, setHabits] = useState([]);
  const [filter, setFilter] = useState("todos");

  useEffect(() => {
    const q = query(collection(db, "habits"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHabits(data);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este hábito?")) {
      try {
        await deleteDoc(doc(db, "habits", id));
        alert("Hábito eliminado correctamente");
      } catch (error) {
        console.error("Error eliminando hábito:", error);
        alert("Error al eliminar hábito");
      }
    }
  };

  const toggleComplete = async (habit) => {
    try {
      await updateDoc(doc(db, "habits", habit.id), {
        completed: !habit.completed,
      });
    } catch (error) {
      console.error("Error al actualizar hábito:", error);
    }
  };

  const filteredHabits = habits.filter((habit) => {
    if (filter === "completados") return habit.completed === true;
    if (filter === "pendientes") return !habit.completed;
    return true;
  });

  const completedCount = habits.filter((h) => h.completed).length;
  const pendingCount = habits.filter((h) => !h.completed).length;

  return (
    <div>
    <AddHabit />

    <div style={{ border: "1px solid #ccc", padding: 20, borderRadius: 8 }}>
      <h3 style={{ marginBottom: 15 }}>Lista de hábitos</h3>

      <div style={{ marginBottom: 20, display: "flex", gap: 10 }}>
        <button
          onClick={() => setFilter("todos")}
          style={{
            padding: "6px 12px",
            backgroundColor: filter === "todos" ? "#4caf50" : "#e0e0e0",
            color: filter === "todos" ? "white" : "#333",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Todos
        </button>
        <button
          onClick={() => setFilter("completados")}
          style={{
            padding: "6px 12px",
            backgroundColor: filter === "completados" ? "#4caf50" : "#e0e0e0",
            color: filter === "completados" ? "white" : "#333",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Completados
        </button>
        <button
          onClick={() => setFilter("pendientes")}
          style={{
            padding: "6px 12px",
            backgroundColor: filter === "pendientes" ? "#4caf50" : "#e0e0e0",
            color: filter === "pendientes" ? "white" : "#333",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Pendientes
        </button>
      </div>

      <div style={{ marginBottom: 15, fontWeight: "600" }}>
        📊 Estadísticas: ✅ {completedCount} completados | ❌ {pendingCount} pendientes
      </div>

         </div>

      {filteredHabits.length === 0 ? (
        <p>No hay hábitos para mostrar.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filteredHabits.map((habit) => (
            <li
              key={habit.id}
              style={{
                marginBottom: 12,
                padding: 10,
                backgroundColor: habit.completed ? "#d4edda" : "#f8d7da",
                borderRadius: 6,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <input
                  type="checkbox"
                  checked={habit.completed || false}
                  onChange={() => toggleComplete(habit)}
                  style={{ marginRight: 10 }}
                />
                <span
                  style={{
                    textDecoration: habit.completed ? "line-through" : "none",
                    fontWeight: "600",
                  }}
                >
                  {habit.name}
                </span>
              </div>
              <button
                onClick={() => handleDelete(habit.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: "red",
                  cursor: "pointer",
                  fontSize: 18,
                }}
                aria-label="Eliminar hábito"
                title="Eliminar hábito"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HabitList;
