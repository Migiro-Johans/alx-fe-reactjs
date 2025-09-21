import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useRecipeStore } from "./recipeStore";

const RecommendationsList = () => {
  const recommendations = useRecipeStore((s) => s.recommendations);
  const generateRecommendations = useRecipeStore((s) => s.generateRecommendations);
  const favorites = useRecipeStore((s) => s.favorites);
  const recipes = useRecipeStore((s) => s.recipes);

  // Refresh recommendations when recipes or favorites change
  useEffect(() => {
    generateRecommendations();
  }, [favorites, recipes, generateRecommendations]);

  return (
    <section style={{ marginTop: "2rem" }}>
      <h2>Recommended for You</h2>
      {!recommendations.length && <p>No recommendations yet. Add some favorites!</p>}
      {recommendations.map((r) => (
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

export default RecommendationsList;
