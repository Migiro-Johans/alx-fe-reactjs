import { useRecipeStore } from "./recipeStore";

const DeleteRecipeButton = ({ recipeId, onDeleted }) => {
  const deleteRecipe = useRecipeStore((s) => s.deleteRecipe);

  const handleDelete = () => {
    if (confirm("Delete this recipe?")) {
      deleteRecipe(recipeId);
      onDeleted?.();
    }
  };

  return (
    <button onClick={handleDelete} style={{ background: "crimson", color: "white", padding: ".5rem 1rem", border: 0 }}>
      Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;
