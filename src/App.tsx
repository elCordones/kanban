/**
 * Projecte Kanban Alumnes
 * Author: David Cordones
 * Year: 2025
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

import { useState, useEffect } from 'react'
import { translations } from './translations'
import type { Language } from './translations'
import './App.css'

type ColumnId = 'todo' | 'inprogress' | 'review' | 'done';
type Theme = 'light' | 'dark' | 'auto';

interface Task {
  id: string;
  content: string;
  column: ColumnId;
  createdAt: number;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('kanban-lang');
    if (saved) return saved as Language;
    const browserLang = navigator.language.split('-')[0];
    return (['ca', 'es', 'gl', 'eu', 'en'].includes(browserLang) ? browserLang : 'ca') as Language;
  });
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('kanban-theme') as Theme) || 'auto');

  const t = translations[lang];

  // Persistence: Tasks
  useEffect(() => {
    const saved = localStorage.getItem('kanban-tasks');
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Persistence: Settings
  useEffect(() => {
    localStorage.setItem('kanban-lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('kanban-theme', theme);
    applyTheme(theme);
  }, [theme]);

  const applyTheme = (currentTheme: Theme) => {
    let effectiveTheme = currentTheme;
    if (currentTheme === 'auto') {
      effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', effectiveTheme);
  };

  // Listen for system theme changes if 'auto' is selected
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'auto') applyTheme('auto');
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    const newTask: Task = {
      id: crypto.randomUUID(),
      content: newTaskText,
      column: 'todo',
      createdAt: Date.now(),
    };
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const moveTask = (taskId: string, targetColumn: ColumnId) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, column: targetColumn } : t));
  };

  const deleteTask = (taskId: string) => {
    if (window.confirm(t.deleteConfirm)) {
      setTasks(tasks.filter(t => t.id !== taskId));
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(tasks, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kanban-export-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const importData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedTasks = JSON.parse(event.target?.result as string);
        if (Array.isArray(importedTasks)) {
          setTasks(importedTasks);
        } else {
          alert('Error: El fitxer no té un format vàlid.');
        }
      } catch (err) {
        alert('Error en llegir el fitxer JSON.');
      }
    };
    reader.readAsText(file);
    // Reset input
    e.target.value = '';
  };

  const COLUMNS: { id: ColumnId; label: string; var: string }[] = [
    { id: 'todo', label: t.todo, var: '--column-todo' },
    { id: 'inprogress', label: t.inprogress, var: '--column-inprogress' },
    { id: 'review', label: t.review, var: '--column-review' },
    { id: 'done', label: t.done, var: '--column-done' },
  ];

  return (
    <>
      <div className="kanban-container">
        <header className="kanban-header">
          <h1>{t.title}</h1>
          
          <div className="controls-row">
            <div className="control-group">
              <label>{t.language}:</label>
              <select value={lang} onChange={(e) => setLang(e.target.value as Language)}>
                <option value="ca">Català</option>
                <option value="es">Español</option>
                <option value="gl">Galego</option>
                <option value="eu">Euskara</option>
                <option value="en">English</option>
              </select>
            </div>
            <div className="control-group">
              <label>{t.theme}:</label>
              <select value={theme} onChange={(e) => setTheme(e.target.value as Theme)}>
                <option value="light">{t.themeLight}</option>
                <option value="dark">{t.themeDark}</option>
                <option value="auto">{t.themeAuto}</option>
              </select>
            </div>
            <div className="control-group">
              <button className="btn btn-secondary" onClick={exportData}>{t.export}</button>
              <label className="btn btn-secondary" style={{ cursor: 'pointer' }}>
                {t.import}
                <input type="file" accept=".json" onChange={importData} style={{ display: 'none' }} />
              </label>
            </div>
          </div>

          <form onSubmit={addTask} className="add-task-form">
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder={t.newTask}
              required
            />
            <button type="submit" className="btn">{t.add}</button>
          </form>
        </header>

        <div className="kanban-board">
          {COLUMNS.map((column) => (
            <div key={column.id} className="kanban-column" style={{ backgroundColor: `var(${column.var})` }}>
              <h2>{column.label}</h2>
              <div className="task-list">
                {tasks
                  .filter((task) => task.column === column.id)
                  .sort((a, b) => b.createdAt - a.createdAt)
                  .map((task) => (
                    <div key={task.id} className="task-card">
                      <p>{task.content}</p>
                      <div className="task-actions">
                        <select 
                          value={task.column} 
                          onChange={(e) => moveTask(task.id, e.target.value as ColumnId)}
                        >
                          {COLUMNS.map(col => (
                            <option key={col.id} value={col.id}>{col.label}</option>
                          ))}
                        </select>
                        <button className="delete-btn" onClick={() => deleteTask(task.id)} title="Delete">🗑️</button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="kanban-footer">
        <p>{t.copyright}</p>
        <p>
          <a href="LICENSE.txt">{t.codeLicense}</a> · 
          <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">
             {t.contentLicense} <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="CC" style={{height: '14px', verticalAlign: 'middle'}} />
             <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="BY" style={{height: '14px', verticalAlign: 'middle'}} />
             <img src="https://mirrors.creativecommons.org/presskit/icons/sa.svg" alt="SA" style={{height: '14px', verticalAlign: 'middle'}} />
          </a>
        </p>
      </footer>
    </>
  );
}

export default App;
