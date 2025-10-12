import TodoList from "./components/TodoList";

export default function App() {
  return (
    <div style={{ padding: 24, maxWidth: 520 }}>
      <h1>React Todo</h1>
      <TodoList />
    </div>
  );
}
