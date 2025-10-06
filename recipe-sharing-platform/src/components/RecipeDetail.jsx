import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load and find the recipe by id
  useEffect(() => {
    let mounted = true;
    import("../data.json")
      .then((mod) => {
        const list = mod.default || [];
        const found = list.find((r) => String(r.id) === String(id));
        if (mounted) setRecipe(found || null);
      })
      .catch((e) => console.error("Failed to load recipe:", e))
      .finally(() => setLoading(false));
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <section className="mx-auto max-w-5xl px-4 py-10">
          <p className="text-gray-600">Loading recipe…</p>
        </section>
      </main>
    );
  }

  if (!recipe) {
    return (
      <main className="min-h-screen bg-gray-50">
        <section className="mx-auto max-w-5xl px-4 py-10 space-y-4">
          <p className="text-gray-700">Recipe not found.</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center rounded-xl px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Go Back
          </button>
        </section>
      </main>
    );
  }

  const { title, summary, image, ingredients = [], steps = [] } = recipe;

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-5xl px-4 py-10">
        {/* Header / Breadcrumb */}
        <div className="mb-6 flex items-center justify-between gap-3">
          <Link
            to="/"
            className="text-sm text-blue-700 hover:underline hover:text-blue-800"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Title */}
        <header className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            {title}
          </h1>
          {summary ? (
            <p className="mt-2 text-gray-600 md:text-base text-sm">{summary}</p>
          ) : null}
        </header>

        {/* Hero section: image + meta */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">
          {/* Image */}
          <div className="md:col-span-3">
            <div className="overflow-hidden rounded-2xl shadow">
              <img
                src={image}
                alt={title}
                className="w-full h-auto object-cover md:max-h-[420px]"
                loading="lazy"
              />
            </div>
          </div>

          {/* Quick info or tips (optional) */}
          <aside className="md:col-span-2 space-y-3">
            <div className="bg-white rounded-2xl shadow p-4">
              <h2 className="text-lg font-semibold mb-2">Quick Tips</h2>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                <li>Use fresh ingredients for best flavor.</li>
                <li>Taste and adjust seasoning as you go.</li>
                <li>Read all steps before you start cooking.</li>
              </ul>
            </div>
          </aside>
        </div>

        {/* Content sections */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Ingredients */}
          <section className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
            {ingredients.length ? (
              <ul className="space-y-2">
                {ingredients.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-gray-800"
                  >
                    <span className="mt-2 h-2 w-2 rounded-full bg-blue-600"></span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No ingredients provided.</p>
            )}
          </section>

          {/* Steps */}
          <section className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            {steps.length ? (
              <ol className="list-decimal list-inside space-y-3 text-gray-800">
                {steps.map((step, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {step}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-gray-600">No steps provided.</p>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
