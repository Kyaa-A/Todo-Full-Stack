// This file handles all communication with our backend API

const API_BASE_URL = 'https://checkaroo-bpgfejcbcud7g8hr.eastus-01.azurewebsites.net';

// Define the shape of a Todo item (TypeScript type)
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
}

// Function to get all todos from the backend
export async function getTodos(): Promise<Todo[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`);
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
}

// Function to create a new todo
export async function createTodo(title: string): Promise<Todo> {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create todo');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
}

// Function to update a todo's completion status
export async function updateTodo(id: number, completed: boolean): Promise<Todo> {
  try {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ completed }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update todo');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
}