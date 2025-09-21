import { useState } from "react";
import { fetchUserData } from "../services/githubService";

export default function Search() {
  const [query, setQuery] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setErrorMsg("");
    setUser(null);

    try {
      const data = await fetchUserData(query.trim());
      setUser(data);
    } catch (err) {
      // 404 or any error → show required message
      setErrorMsg("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} style={{ display: "flex", gap: ".5rem" }}>
        <input
          placeholder="Enter GitHub username e.g. torvalds"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="GitHub username"
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}

      {!loading && errorMsg && (
        <p style={{ color: "crimson", marginTop: "0.5rem" }}>{errorMsg}</p>
      )}

      {!loading && user && (
        <div
          style={{
            marginTop: "1rem",
            display: "grid",
            gridTemplateColumns: "80px 1fr",
            gap: "1rem",
            alignItems: "center",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "1rem",
          }}
        >
          <img
            src={user.avatar_url}
            alt={user.login}
            width={80}
            height={80}
            style={{ borderRadius: "50%" }}
          />
          <div>
            <h3 style={{ margin: 0 }}>{user.name ?? user.login}</h3>
            <p style={{ margin: "0.25rem 0", color: "#6b7280" }}>@{user.login}</p>
            <a href={user.html_url} target="_blank" rel="noreferrer">
              View GitHub Profile
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
