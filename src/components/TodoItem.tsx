'use client';

import { Todo } from '@/lib/api';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({ todo, onToggleComplete, onDelete }: TodoItemProps) {
  const handleToggle = () => {
    onToggleComplete(todo.id, !todo.completed);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      onDelete(todo.id);
    }
  };

  return (
    <div className="group relative bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-300 hover:scale-[1.01]">
      <div className="flex items-center gap-4">
        {/* Custom SAAS Checkbox */}
        <div className="relative">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
            className="sr-only"
          />
          <div 
            onClick={handleToggle}
            className={`w-5 h-5 rounded-md border-2 cursor-pointer transition-all duration-200 flex items-center justify-center ${
              todo.completed 
                ? 'bg-emerald-500 border-emerald-500 shadow-sm' 
                : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
            }`}
          >
            {todo.completed && (
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </div>

        {/* Task Text */}
        <span 
          className={`flex-1 text-sm font-medium transition-all duration-200 ${
            todo.completed 
              ? 'text-gray-400 line-through' 
              : 'text-gray-900'
          }`}
        >
          {todo.title}
        </span>

        {/* Date Badge */}
        <span className="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded-md">
          {new Date(todo.created_at).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric' 
          })}
        </span>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="opacity-0 group-hover:opacity-100 transition-all duration-200 p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-400 hover:text-red-600"
          title="Delete task"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}