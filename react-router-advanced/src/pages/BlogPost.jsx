import { useParams, Link } from "react-router-dom";

export default function BlogPost() {
  const { postId } = useParams();
  return (
    <div>
      <h2>Blog Post #{postId}</h2>
      <p>This page is rendered via a dynamic route using <code>:postId</code>.</p>
      <p><Link to="/blog">Back to blog</Link></p>
    </div>
  );
}
