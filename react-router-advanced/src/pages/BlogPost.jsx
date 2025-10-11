import { useParams, Link } from "react-router-dom";

export default function BlogPost() {
  const { id } = useParams(); // changed from postId -> id
  return (
    <div>
      <h2>Blog Post #{id}</h2>
      <p>Dynamic route via <code>/blog/:id</code>.</p>
      <p><Link to="/blog">Back to blog</Link></p>
    </div>
  );
}
