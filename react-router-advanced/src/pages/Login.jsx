import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { useState } from "react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");

  const from = location.state?.from?.pathname || "/profile"; // where to go after login

  function handleSubmit(e) {
    e.preventDefault();
    login(name || "Demo User");
    navigate(from, { replace: true });
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8, maxWidth: 320 }}>
        <input
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
      {location.state?.from && (
        <p style={{ color: "#666", marginTop: 8 }}>
          You must sign in to view: <code>{from}</code>
        </p>
      )}
    </div>
  );
}
