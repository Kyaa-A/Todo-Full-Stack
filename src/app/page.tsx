'use client';

import { useState, useEffect } from 'react';
import { Todo, getTodos, createTodo, updateTodo } from '@/lib/api';
import AddTodo from '@/components/AddTodo';
import TodoItem from '@/components/TodoItem';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load todos when the component first loads
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedTodos = await getTodos();
      setTodos(fetchedTodos);
    } catch (err) {
      setError('Failed to load todos. Make sure your backend is running!');
      console.error('Error loading todos:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTodo = async (title: string) => {
    try {
      const newTodo = await createTodo(title);
      setTodos(prev => [newTodo, ...prev]); // Add to the beginning of the list
    } catch (err) {
      setError('Failed to add todo');
      throw err; // Re-throw so AddTodo component can handle it
    }
  };

  const handleToggleComplete = async (id: number, completed: boolean) => {
    try {
      const updatedTodo = await updateTodo(id, completed);
      setTodos(prev => 
        prev.map(todo => 
          todo.id === id ? updatedTodo : todo
        )
      );
    } catch (err) {
      setError('Failed to update todo');
      console.error('Error updating todo:', err);
    }
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📝 My Todo List
          </h1>
          <p className="text-gray-600">
            Stay organized and get things done!
          </p>
        </div>

        {/* Add Todo Form */}
        <AddTodo onAddTodo={handleAddTodo} />

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-8">
            <div className="text-gray-500">Loading todos...</div>
          </div>
        ) : (
          <>
            {/* Stats */}
            {totalCount > 0 && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-700 text-center">
                  📊 {completedCount} of {totalCount} todos completed 
                  {totalCount > 0 && ` (${Math.round((completedCount / totalCount) * 100)}%)`}
                </p>
              </div>
            )}

            {/* Todo List */}
            {todos.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  No todos yet!
                </h2>
                <p className="text-gray-500">
                  Add your first todo above to get started.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {todos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggleComplete={handleToggleComplete}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>Built with Next.js, Express, and Supabase 💙</p>
        </div>
      </div>
    </div>
  );
}