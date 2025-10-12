import { useState } from "react";
import AddTodoForm from "./AddTodoForm";

const initialTodos = [
  { id: 1, text: "Learn React", completed: false },
  { id: 2, text: "Build Todo App", completed: true },
  { id: 3, text: "Write Tests", completed: false },
];

export default function TodoList() {
  const [todos, setTodos] = useState(initialTodos);

  function addTodo(text) {
    const id = Math.max(0, ...todos.map(t => t.id)) + 1;
    setTodos((prev) => [...prev, { id, text, completed: false }]);
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div>
      <AddTodoForm onAdd={addTodo} />

      <ul role="list" aria-label="todo-list" style={{ padding: 0, marginTop: 16 }}>
        {todos.map((t) => (
          <li
            key={t.id}
            role="listitem"
            onClick={() => toggleTodo(t.id)}
            style={{
              listStyle: "none",
              border: "1px solid #eee",
              padding: "10px 12px",
              marginBottom: 8,
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              textDecoration: t.completed ? "line-through" : "none",
              color: t.completed ? "#777" : "inherit",
            }}
          >
            <span>{t.text}</span>

            <button
              aria-label={`delete-${t.text}`}
              onClick={(e) => {
                e.stopPropagation(); // prevent toggle when clicking delete
                deleteTodo(t.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
