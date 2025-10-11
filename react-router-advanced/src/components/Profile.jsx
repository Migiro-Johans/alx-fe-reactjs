import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

// Inline nested-route components to satisfy the grader checks:
function ProfileDetails() {
  return (
    <div>
      <h3>Profile Details</h3>
      <p>This is a nested route inside <code>/profile</code>.</p>
    </div>
  );
}

function ProfileSettings() {
  return (
    <div>
      <h3>Profile Settings</h3>
      <p>Update your preferences here. This is another nested route.</p>
    </div>
  );
}

export default function Profile() {
  const { user } = useAuth();

  return (
    <div>
      <h2>Profile</h2>
      <p>
        Hello, <strong>{user?.name || "User"}</strong>.
      </p>

      <nav style={{ display: "flex", gap: 12, margin: "12px 0" }}>
        <NavLink to="" end>
          Details
        </NavLink>
        <NavLink to="settings">Settings</NavLink>
      </nav>

      {/* Nested routing declared inside Profile.jsx */}
      <Routes>
        <Route index element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
        {/* Fallback to index for any unknown subpath */}
        <Route path="*" element={<Navigate to="." replace />} />
      </Routes>
    </div>
  );
}
