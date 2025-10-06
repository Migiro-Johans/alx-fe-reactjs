import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddRecipeForm() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState(""); // newline separated
  const [steps, setSteps] = useState(""); // newline separated
  const [touched, setTouched] = useState({ title: false, ingredients: false, steps: false });

  // helpers
  const normLines = (txt) =>
    txt
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean);

  // validation
  const errors = {
    title: title.trim().length === 0 ? "Title is required." : "",
    ingredients:
      ingredients.trim().length === 0
        ? "Ingredients are required."
        : normLines(ingredients).length < 2
        ? "Include at least two ingredients (one per line)."
        : "",
    steps:
      steps.trim().length === 0
        ? "Instructions are required."
        : normLines(steps).length < 1
        ? "Add at least one instruction step."
        : "",
  };

  const isValid = !errors.title && !errors.ingredients && !errors.steps;

  const onSubmit = (e) => {
    e.preventDefault();
    setTouched({ title: true, ingredients: true, steps: true });
    if (!isValid) return;

    // Minimal demo “persistence”: store in localStorage so you can read later or merge in HomePage
    const newRecipe = {
      id: Date.now(),
      title: title.trim(),
      summary:
        normLines(steps)[0]?.slice(0, 120) ||
        "User-submitted recipe",
      image: "https://via.placeholder.com/800x500?text=New+Recipe",
      ingredients: normLines(ingredients),
      steps: normLines(steps),
    };

    const existing = JSON.parse(localStorage.getItem("recipes") || "[]");
    localStorage.setItem("recipes", JSON.stringify([newRecipe, ...existing]));

    // Navigate home after submit
    navigate("/");
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-3xl px-4 py-10">
        {/* Top bar */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            Add a New Recipe
          </h1>
          <Link
            to="/"
            className="text-sm rounded-xl px-3 py-2 bg-white shadow hover:shadow-lg transition"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow p-6 md:p-8">
          <form onSubmit={onSubmit} noValidate className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Recipe Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, title: true }))}
                className={`mt-2 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2
                  ${touched.title && errors.title ? "border-red-400 ring-red-200" : "border-gray-300 focus:ring-blue-200"}`}
                placeholder="e.g., Spaghetti Carbonara"
              />
              {touched.title && errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Two-column responsive layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ingredients */}
              <div>
                <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
                  Ingredients <span className="text-gray-500">(one per line)</span>
                </label>
                <textarea
                  id="ingredients"
                  rows={8}
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, ingredients: true }))}
                  className={`mt-2 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2
                    ${touched.ingredients && errors.ingredients ? "border-red-400 ring-red-200" : "border-gray-300 focus:ring-blue-200"}`}
                  placeholder={"200g spaghetti\n100g pancetta\n2 eggs\n50g Parmesan\nSalt & pepper"}
                />
                {touched.ingredients && errors.ingredients && (
                  <p className="mt-1 text-sm text-red-600">{errors.ingredients}</p>
                )}
              </div>

              {/* Steps */}
              <div>
                <label htmlFor="steps" className="block text-sm font-medium text-gray-700">
                  Instructions <span className="text-gray-500">(one step per line)</span>
                </label>
                <textarea
                  id="steps"
                  rows={8}
                  value={steps}
                  onChange={(e) => setSteps(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, steps: true }))}
                  className={`mt-2 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2
                    ${touched.steps && errors.steps ? "border-red-400 ring-red-200" : "border-gray-300 focus:ring-blue-200"}`}
                  placeholder={"Boil pasta until al dente\nFry pancetta until crisp\nMix eggs and cheese\nCombine off heat"}
                />
                {touched.steps && errors.steps && (
                  <p className="mt-1 text-sm text-red-600">{errors.steps}</p>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setTitle(""); setIngredients(""); setSteps(""); setTouched({title:false, ingredients:false, steps:false});
                }}
                className="rounded-xl bg-white px-4 py-2 shadow hover:shadow-lg transition"
              >
                Clear
              </button>
              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-white font-medium hover:bg-blue-700 shadow hover:shadow-lg transition disabled:opacity-50"
                disabled={!isValid}
                aria-disabled={!isValid}
              >
                Submit Recipe
              </button>
            </div>

            {/* Small helper note */}
            <p className="text-xs text-gray-500">
              Tip: Use one ingredient/step per line. Your recipe is saved to your browser and shown on the Home page if you merge local data.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
