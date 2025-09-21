import { Link } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";
import FavoriteButton from "./FavoriteButton";

const RecipeList = () => {
  const filteredRecipes = useRecipeStore((s) => s.filteredRecipes);

  if (!filteredRecipes.length) return <p>No recipes match your search.</p>;

  return (
    <div>
      {filteredRecipes.map((r) => (
        <div key={r.id} style={{ marginBottom: "1rem" }}>
          <h3 style={{ marginBottom: ".25rem" }}>
            <Link to={`/recipes/${r.id}`}>{r.title}</Link>
            <FavoriteButton recipeId={r.id} />
          </h3>
          <p style={{ margin: 0 }}>{r.description}</p>
          <div style={{ marginTop: ".25rem" }}>
            <Link to={`/recipes/${r.id}`}>View / Edit</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
