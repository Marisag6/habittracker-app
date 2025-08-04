import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import db from "../firebase";

const AddHabit = () => {
  const [habitName, setHabitName] = useState("");

  const handleAddHabit = async (e) => {
    e.preventDefault();
    if (habitName.trim() === "") return;

    await addDoc(collection(db, "habits"), {
      name: habitName,
      createdAt: serverTimestamp(),
    });

    setHabitName("");
  };

  return (
    <form onSubmit={handleAddHabit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        value={habitName}
        onChange={(e) => setHabitName(e.target.value)}
        placeholder="Nuevo hábito"
        style={{ padding: "0.5rem", width: "70%", marginRight: "0.5rem" }}
      />
      <button type="submit" style={{ padding: "0.5rem" }}>Agregar</button>
    </form>
  );
};

export default AddHabit;
