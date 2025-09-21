import { Link } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";

const FavoritesList = () => {
  const favorites = useRecipeStore((s) => s.favorites);
  const recipes = useRecipeStore((s) => s.recipes);

  const favRecipes = favorites
    .map((id) => recipes.find((r) => r.id === id))
    .filter(Boolean);

  return (
    <section style={{ marginTop: "2rem" }}>
      <h2>My Favorites</h2>
      {!favRecipes.length && <p>No favorites yet. Mark some recipes ★</p>}
      {favRecipes.map((r) => (
        <div key={r.id} style={{ marginBottom: ".75rem" }}>
          <h3 style={{ margin: 0 }}>
            <Link to={`/recipes/${r.id}`}>{r.title}</Link>
          </h3>
          <p style={{ margin: 0 }}>{r.description}</p>
        </div>
      ))}
    </section>
  );
};

export default FavoritesList;
