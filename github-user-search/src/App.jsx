import { useState } from 'react'
import Search from "./components/Search";

export default function App() {
  return (
    <div style={{ maxWidth: 800, margin: "2rem auto", padding: "0 1rem", fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif" }}>
      <h1>GitHub User Search</h1>
      <Search />
    </div>
  );
}

export default App
