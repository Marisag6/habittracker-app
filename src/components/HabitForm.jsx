import React, { useState } from "react";
import db from "../firebase.js";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const HabitForm = () => {
  const [habit, setHabit] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!habit.trim()) return;

    try {
      await addDoc(collection(db, "habits"), {
        name: habit,
        createdAt: Timestamp.now(),
      });
      setHabit("");
      alert("¡Hábito guardado en Firestore!");
    } catch (error) {
      console.error("Error al guardar hábito:", error);
      alert("Error al guardar hábito");
    }
  };
     return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={habit}
        onChange={(e) => setHabit(e.target.value)}
        placeholder="Ej: Meditar 10 min"
      />
      <button type="submit">Agregar hábito</button>
    </form>
  );



};

export default HabitForm;
