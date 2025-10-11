import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Profile from "./components/Profile"; 

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div style={{ padding: 24 }}>
          <header style={{ display: "flex", gap: 16, marginBottom: 16 }}>
            <Link to="/">Home</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/profile">Profile (Protected)</Link>
            <Link to="/login">Login</Link>
          </header>

          <Routes>
            <Route path="/" element={<Home />} />

            {/* Blog list and dynamic route */}
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            {/* Protected parent; nested routes are defined inside Profile.jsx */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route path="/login" element={<Login />} />

            {/* 404 */}
            <Route path="*" element={<div>404 — Not Found</div>} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
