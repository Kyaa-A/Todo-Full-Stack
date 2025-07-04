'use client';

import { useState, useEffect } from 'react';
import { Todo, getTodos, createTodo, updateTodo, deleteTodo } from '@/lib/api';

// Import organized components
import Header from '@/components/Header';
import StatsCard from '@/components/StatsCard';
import AddTodo from '@/components/AddTodo';
import TodoItem from '@/components/TodoItem';
import EmptyState from '@/components/EmptyState';
import LoadingState from '@/components/LoadingState';
import ErrorAlert from '@/components/ErrorAlert';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      setError('Unable to connect to your workspace. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTodo = async (title: string) => {
    try {
      const newTodo = await createTodo(title);
      setTodos(prev => [newTodo, ...prev]);
      setError(null);
    } catch (err) {
      setError('Failed to add task. Please try again.');
      throw err;
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
      setError(null);
    } catch (err) {
      setError('Failed to update task. Please try again.');
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete task. Please try again.');
    }
  };

  // Calculate stats
  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        
        {/* SAAS Header */}
        <Header />

        {/* SAAS Stats Dashboard */}
        {totalCount > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatsCard
              title="Total Tasks"
              value={totalCount}
              color="blue"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              }
            />
            <StatsCard
              title="Completed"
              value={completedCount}
              color="emerald"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              }
            />
            <StatsCard
              title="Progress"
              value={`${progressPercentage}%`}
              color="purple"
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              }
            />
          </div>
        )}

        {/* SAAS Add Todo Form */}
        <AddTodo onAddTodo={handleAddTodo} />

        {/* SAAS Error Alert */}
        {error && (
          <ErrorAlert 
            message={error} 
            onRetry={loadTodos}
          />
        )}

        {/* SAAS Content Area */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm min-h-[400px]">
          {isLoading ? (
            <LoadingState />
          ) : todos.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Your Tasks</h2>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {totalCount} {totalCount === 1 ? 'task' : 'tasks'}
                </span>
              </div>
              
              <div className="space-y-3">
                {todos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggleComplete={handleToggleComplete}
                    onDelete={handleDeleteTodo}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SAAS Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600 font-medium">TaskFlow Pro - Powered by modern technology</span>
          </div>
        </div>
      </div>
    </div>
  );
}