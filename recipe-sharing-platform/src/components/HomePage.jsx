import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load JSON on mount via dynamic import (works great with Vite in /src)
  useEffect(() => {
    let mounted = true;
    import("../data.json")
      .then((mod) => {
        if (mounted) setRecipes(mod.default || []);
      })
      .catch((e) => {
        console.error("Failed to load recipes:", e);
      })
      .finally(() => setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Page header */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Discover Recipes</h1>
          <p className="text-gray-600 mt-2">
            Browse delicious ideas and find your next favorite dish.
          </p>
        </div>

        {/* Loading / Empty states */}
        {loading && (
          <div className="text-gray-600">Loading recipes…</div>
        )}

        {!loading && recipes.length === 0 && (
          <div className="text-gray-600">
            No recipes yet. Check back soon!
          </div>
        )}

        {/* Responsive grid */}
        {!loading && recipes.length > 0 && (
          <div
            className="grid gap-6
                       grid-cols-1
                       sm:grid-cols-2
                       lg:grid-cols-3
                       xl:grid-cols-4"
        >
  {recipes.map((r) => (
    <div
      key={r.id}
      className="hover:shadow-lg hover:-translate-y-0.5 transition transform rounded-xl">
      <RecipeCard recipe={r} />
	  </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
export default HomePage;
