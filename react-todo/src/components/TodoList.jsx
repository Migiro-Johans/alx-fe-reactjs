import { useState } from "react";
import AddTodoForm from "./AddTodoForm";

const initialTodos = [
  { id: 1, text: "Learn React", completed: false },
  { id: 2, text: "Write Tests", completed: true },
  { id: 3, text: "Ship Feature", completed: false },
];

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);

  const addTodo = (text) => {
    setTodos((prev) => [...prev, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAdd={addTodo} />
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <span
              onClick={() => toggleTodo(t.id)}
              role="button"
              style={{
                cursor: "pointer",
                textDecoration: t.completed ? "line-through" : "none",
              }}
            >
              {t.text}
            </span>
            <button onClick={() => deleteTodo(t.id)} style={{ marginLeft: 8 }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
