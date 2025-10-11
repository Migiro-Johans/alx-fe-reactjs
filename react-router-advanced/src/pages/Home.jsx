import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function Home() {
  const { isAuthenticated, user, logout } = useAuth();
  return (
    <div>
      <h2>Home</h2>
      <p>Welcome to the advanced React Router demo.</p>
      <ul>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/profile">Profile (Protected)</Link></li>
      </ul>

      {isAuthenticated ? (
        <p>
          Signed in as <strong>{user?.name}</strong>.{" "}
          <button onClick={logout}>Logout</button>
        </p>
      ) : (
        <p><Link to="/login">Login</Link> to access protected routes.</p>
      )}
    </div>
  );
}
