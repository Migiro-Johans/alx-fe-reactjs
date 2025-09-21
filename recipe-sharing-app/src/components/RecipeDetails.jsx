import { useParams, Link, useNavigate } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";
import EditRecipeForm from "./EditRecipeForm";
import DeleteRecipeButton from "./DeleteRecipeButton";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = useRecipeStore((s) => s.recipes.find((r) => String(r.id) === id));

  if (!recipe) {
    return (
      <main style={{ maxWidth: 720, margin: "2rem auto", padding: "0 1rem" }}>
        <p>Recipe not found.</p>
        <Link to="/">← Back</Link>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 720, margin: "2rem auto", padding: "0 1rem" }}>
      <Link to="/">← Back</Link>
      <h1 style={{ marginTop: "1rem" }}>{recipe.title}</h1>
      <p style={{ whiteSpace: "pre-wrap" }}>{recipe.description}</p>

      <h2 style={{ marginTop: "1.5rem" }}>Edit Recipe</h2>
      <EditRecipeForm recipeId={recipe.id} />

      <div style={{ marginTop: "1rem" }}>
        <DeleteRecipeButton
          recipeId={recipe.id}
          onDeleted={() => navigate("/")}
        />
      </div>
    </main>
  );
};
export default RecipeDetails;
