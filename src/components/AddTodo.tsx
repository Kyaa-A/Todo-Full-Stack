'use client';

import { useState } from 'react';

interface AddTodoProps {
  onAddTodo: (title: string) => void;
}

export default function AddTodo({ onAddTodo }: AddTodoProps) {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    setIsLoading(true);
    try {
      await onAddTodo(title.trim());
      setTitle('');
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <form onSubmit={handleSubmit}>
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* SAAS Input Field */}
            <div className="flex-1">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What would you like to accomplish today?"
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-base disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            {/* SAAS Add Button */}
            <button
              type="submit"
              disabled={isLoading || !title.trim()}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 whitespace-nowrap"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Adding...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Add Task</span>
                </div>
              )}
            </button>
          </div>
          
          {/* SAAS Helper Text */}
          <p className="mt-3 text-sm text-gray-500">
            Press Enter or click "Add Task" to create a new item
          </p>
        </div>
      </form>
    </div>
  );
}