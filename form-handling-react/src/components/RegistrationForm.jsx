import { useState } from "react";
import { registerUser } from "../services/api";

export default function RegistrationForm() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, message: "", type: "" });

  function validate(v) {
    const e = {};
    if (!v.username.trim()) e.username = "Username is required";
    if (!v.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Enter a valid email";
    if (!v.password) e.password = "Password is required";
    else if (v.password.length < 6) e.password = "Min 6 characters";
    return e;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // live-validate just that field
    setErrors((prev) => {
      const next = validate({ ...values, [name]: value });
      return { ...prev, [name]: next[name] };
    });
  }
async function handleSubmit(e) {
    e.preventDefault();
    const eMap = validate(values);
    setErrors(eMap);
    if (Object.keys(eMap).length) return;

    setStatus({ loading: true, message: "", type: "" });
    try {
      // ReqRes expects { email, password }, username is just local UI
      const result = await registerUser({ email: values.email, password: values.password });
      setStatus({ loading: false, message: `Success! Token: ${result.token}`, type: "success" });
      setValues({ username: "", email: "", password: "" });
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
          value={values.username}
          onChange={handleChange}
          style={styles.input}
          placeholder="jane_doe"
        />
        {errors.username && <span style={styles.error}>{errors.username}</span>}
      </label>

      <label style={styles.label}>
        Email
        <input
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          style={styles.input}
          placeholder="jane@example.com"
        />
        {errors.email && <span style={styles.error}>{errors.email}</span>}
      </label>

      <label style={styles.label}>
        Password
        <input
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          style={styles.input}
          placeholder="•••••••"
        />
        {errors.password && <span style={styles.error}>{errors.password}</span>}
      </label>

      <button disabled={status.loading} style={styles.button}>
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

