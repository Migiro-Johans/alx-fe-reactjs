// src/components/RegistrationForm.jsx
import { useState } from "react";

export default function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, message: "", type: "" });

  function validate() {
    const e = {};
    if (!username) e.username = "Username is required";
    if (!email) e.email = "Email is required"; 
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Min 6 characters";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const eMap = validate();
    setErrors(eMap);
    if (Object.keys(eMap).length) return;

    setStatus({ loading: true, message: "", type: "" });
    try {
      const res = await fetch("https://reqres.in/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Registration failed");

      setStatus({ loading: false, message: `Success! Token: ${data.token}`, type: "success" });
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setStatus({ loading: false, message: err.message, type: "error" });
    }
  }

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Controlled Registration Form</h2>

      <label style={styles.label}>
        Username
        <input
          name="username"
          value={username}       
          onChange={(e) => setUsername(e.target.value)}
          placeholder="jane_doe"
          style={styles.input}
        />
        {errors.username && <span style={styles.error}>{errors.username}</span>}
      </label>

      <label style={styles.label}>
        Email
        <input
          name="email"
          type="email"
          value={email}           
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jane@example.com"
          style={styles.input}
        />
        {errors.email && <span style={styles.error}>{errors.email}</span>}
      </label>

      <label style={styles.label}>
        Password
        <input
          name="password"
          type="password"
          value={password}        
          onChange={(e) => setPassword(e.target.value)}
          placeholder="•••••••"
          style={styles.input}
        />
        {errors.password && <span style={styles.error}>{errors.password}</span>}
      </label>

      <button type="submit" disabled={status.loading} style={styles.button}>
        {status.loading ? "Submitting..." : "Register"}
      </button>

      {status.message && (
        <p style={{ ...styles.status, color: status.type === "success" ? "green" : "crimson" }}>
          {status.message}
        </p>
      )}
    </form>
  );
}

const styles = {
  form: { maxWidth: 420, display: "grid", gap: 12, padding: 16, border: "1px solid #eee", borderRadius: 12 },
  label: { display: "grid", gap: 6, fontSize: 14 },
  input: { padding: 10, borderRadius: 8, border: "1px solid #ccc" },
  button: { padding: "10px 14px", borderRadius: 8, border: "none", background: "black", color: "white", cursor: "pointer" },
  error: { color: "crimson", fontSize: 12 },
  status: { marginTop: 8, fontSize: 14 },
};

