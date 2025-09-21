import { useNavigate } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";

const DeleteRecipeButton = ({ recipeId, redirectTo = "/" }) => {
  const navigate = useNavigate();
  const deleteRecipe = useRecipeStore((s) => s.deleteRecipe);

  const handleDelete = () => {
    if (confirm("Delete this recipe?")) {
      deleteRecipe(recipeId);
      navigate(redirectTo);
    }
  };

  return (
    <button
      onClick={handleDelete}
      style={{ background: "crimson", color: "white", padding: ".5rem 1rem", border: 0 }}
    >
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;
