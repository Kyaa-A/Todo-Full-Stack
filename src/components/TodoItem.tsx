'use client';

import { Todo } from '@/lib/api';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: number, completed: boolean) => void;
}

export default function TodoItem({ todo, onToggleComplete }: TodoItemProps) {
  const handleToggle = () => {
    onToggleComplete(todo.id, !todo.completed);
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
      />
      <span 
        className={`flex-1 ${
          todo.completed 
            ? 'text-gray-500 line-through' 
            : 'text-gray-900'
        }`}
      >
        {todo.title}
      </span>
      <span className="text-xs text-gray-400">
        {new Date(todo.created_at).toLocaleDateString()}
      </span>
    </div>
  );
}