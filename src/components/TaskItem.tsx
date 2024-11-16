import React from 'react';

interface TaskItemProps {
  title: string;
  completed: boolean;
  onDelete: () => void;
  onToggleCompletion: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ title, completed, onDelete, onToggleCompletion }) => {
  return (
    <div>
      <h3 style={{ textDecoration: completed ? 'line-through' : 'none' }}>{title}</h3>
      <button onClick={onToggleCompletion}>{completed ? 'Undo' : 'Complete'}</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default TaskItem; // Ensure the component is exported
