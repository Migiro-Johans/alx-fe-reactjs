import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PostsComponent from "./components/PostsComponent";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,         // fresh for 30s
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export default function App() {
  const [showPosts, setShowPosts] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ padding: 24, display: "grid", gap: 16 }}>
        <h1>React Query Demo: Posts</h1>

        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setShowPosts((s) => !s)}>
            {showPosts ? "Hide" : "Show"} PostsComponent
          </button>
        </div>

        {showPosts && <PostsComponent />}
        <p style={{ color: "#666" }}>
          Tip: hide then show the component within 30s to see cached data render instantly.
        </p>
      </div>

      {/* Optional devtools */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
