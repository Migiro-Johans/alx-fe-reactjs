import { useEffect, useState } from "react";
import { useRecipeStore } from "./recipeStore";

const EditRecipeForm = ({ recipeId }) => {
  const recipe = useRecipeStore((s) => s.recipes.find((r) => r.id === recipeId));
  const updateRecipe = useRecipeStore((s) => s.updateRecipe);

  const [title, setTitle] = useState(recipe?.title || "");
  const [description, setDescription] = useState(recipe?.description || "");
  const [error, setError] = useState("");

  useEffect(() => {
    // keep form in sync if store changes
    setTitle(recipe?.title || "");
    setDescription(recipe?.description || "");
  }, [recipe?.title, recipe?.description]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }
    updateRecipe(recipeId, {
      title: title.trim(),
      description: description.trim(),
    });
    setError("");
  };

  if (!recipe) return null;

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: ".5rem" }}>
      {error && <p style={{ color: "crimson" }}>{error}</p>}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ display: "block", width: "100%", marginBottom: ".5rem" }}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ display: "block", width: "100%", minHeight: 90, marginBottom: ".5rem" }}
      />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditRecipeForm;
