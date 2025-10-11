import { Link } from "react-router-dom";

export default function Blog() {
  const posts = [
    { id: 1, title: "Routing Basics" },
    { id: 2, title: "Nested Routes" },
    { id: 3, title: "Protected Routes" },
  ];
  return (
    <div>
      <h2>Blog</h2>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            <Link to={`/blog/${p.id}`}>#{p.id} — {p.title}</Link>
          </li>
        ))}
      </ul>
      <p>Click a post to navigate to <code>/blog/:postId</code> (dynamic route).</p>
    </div>
  );
}
