import { useRecipeStore } from "./recipeStore";

const FavoriteButton = ({ recipeId }) => {
  const favorites = useRecipeStore((s) => s.favorites);
  const addFavorite = useRecipeStore((s) => s.addFavorite);
  const removeFavorite = useRecipeStore((s) => s.removeFavorite);

  const isFav = favorites.includes(recipeId);

  const toggle = () => {
    if (isFav) removeFavorite(recipeId);
    else addFavorite(recipeId);
  };

  return (
    <button onClick={toggle} style={{ marginLeft: ".5rem" }}>
      {isFav ? "★ Unfavorite" : "☆ Favorite"}
    </button>
  );
};

export default FavoriteButton;
