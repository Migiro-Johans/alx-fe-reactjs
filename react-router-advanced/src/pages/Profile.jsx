import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div>
      <h2>Profile</h2>
      <p>Hello, <strong>{user?.name || "User"}</strong>.</p>

      <nav style={{ display: "flex", gap: 12, margin: "12px 0" }}>
        <NavLink to="" end>Details</NavLink>
        <NavLink to="settings">Settings</NavLink>
      </nav>

      {/* Nested routes render here */}
      <Outlet />
    </div>
  );
}

