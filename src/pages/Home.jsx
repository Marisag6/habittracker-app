import React, { useState } from "react";
import CalendarView from "../components/CalendarView";
import DailyLogModal from "../components/DailyLogModal";
import HabitList from "../components/HabitList";
import ThemeToggle from "../components/ThemeToggle";
import AddHabit from "../components/AddHabit";
import FilterButtons from "../components/FilterButtons";
const Home = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <>
    <ThemeToggle />
    <div style={{ maxWidth: 800, margin: "auto", padding: 20, fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: 30 }}>📅 Planificador de Hábitos</h1>

      <CalendarView onDateClick={setSelectedDate} />

      {selectedDate && (
        <DailyLogModal date={selectedDate} onClose={() => setSelectedDate(null)} />
      )}

      <hr style={{ margin: "40px 0" }} />

      <HabitList />
    
    </div>
    
    </>
  );
};

export default Home;
