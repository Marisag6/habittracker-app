// src/components/ThemeToggle.jsx
import React, { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  <button style={{
  backgroundColor: 'var(--primary)',
  color: '#fff',
  border: 'none',
  padding: '10px 16px',
  borderRadius: 'var(--border-radius)',
  boxShadow: 'var(--shadow)',
  cursor: 'pointer',
  transition: 'var(--transition)',
}}>
  Cambiar tema
</button>

  return (
    <button onClick={toggleTheme} style={{ position: 'fixed', top: 20, right: 20, zIndex: 999 }}>
      {theme === 'dark' ? '☀️ Modo Claro' : '🌙 Modo Oscuro'}
    </button>
    
  );

  
};

export default ThemeToggle;
