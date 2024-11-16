import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: string;
}

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (id: number) => void;
  onToggleCompletion: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDeleteTask, onToggleCompletion }) => {
  return (
    <ul>
      <AnimatePresence>
        {tasks.map((task) => (
          <motion.li
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            layout
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleCompletion(task.id)}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.title} - {task.priority}
            </span>
            <button onClick={() => onDeleteTask(task.id)}>Delete</button>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default TaskList;
