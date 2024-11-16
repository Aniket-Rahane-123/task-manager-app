import React, { useState } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { useLocalStorage } from './hooks/useLocalStorage';
import './App.css';


interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: string;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortCriteria, setSortCriteria] = useState<'priority' | 'title' | 'status'>('title');

  const addTask = (title: string, priority: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
      priority,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks
    .filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortCriteria === 'priority') {
        return a.priority.localeCompare(b.priority);
      }
      if (sortCriteria === 'title') {
        return a.title.localeCompare(b.title);
      }
      return Number(a.completed) - Number(b.completed);
    });

  return (
    <div>
      <h1>Task Manager</h1>
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div>
        <label>Sort By:</label>
        <select value={sortCriteria} onChange={(e) => setSortCriteria(e.target.value as any)}>
          <option value="title">Title</option>
          <option value="priority">Priority</option>
          <option value="status">Completion Status</option>
        </select>
      </div>
      <TaskInput onAddTask={addTask} />
      <TaskList tasks={filteredTasks} onDeleteTask={deleteTask} onToggleCompletion={toggleTaskCompletion} />
    </div>
  );
};

export default App;
