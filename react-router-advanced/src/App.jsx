import { Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import ProtectedRoute from "./routes/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Profile from "./pages/Profile";
import ProfileDetails from "./pages/ProfileDetails";
import ProfileSettings from "./pages/ProfileSettings";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <AuthProvider>
      <div style={{ padding: 24 }}>
        <header style={{ display: "flex", gap: 16, marginBottom: 16 }}>
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/profile">Profile (Protected)</Link>
          <Link to="/login">Login</Link>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />

          {/* Dynamic route example */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:postId" element={<BlogPost />} />

          {/* Protected route + nested routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          >
            {/* Nested routes under /profile */}
            <Route index element={<ProfileDetails />} />
            <Route path="settings" element={<ProfileSettings />} />
          </Route>

          <Route path="/login" element={<Login />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}
