import { create } from "zustand";

export const useRecipeStore = create((set, get) => {
  const applyFilter = (recipes, term) => {
    const q = (term || "").trim().toLowerCase();
    if (!q) return recipes;
    return recipes.filter((r) => {
      const title = (r.title || "").toLowerCase();
      const desc = (r.description || "").toLowerCase();
      const ing  = Array.isArray(r.ingredients) ? r.ingredients.join(" ").toLowerCase() : "";
      return title.includes(q) || desc.includes(q) || ing.includes(q);
    });
  };

  return {
    recipes: [],
    filteredRecipes: [],      // ← required by the task
    searchTerm: "",

    setSearchTerm: (term) => {
      const { recipes } = get();
      set({
        searchTerm: term,
        filteredRecipes: applyFilter(recipes, term),
      });
    },

    addRecipe: (newRecipe) =>
      set((state) => {
        const recipes = [...state.recipes, newRecipe];
        return {
          recipes,
          filteredRecipes: applyFilter(recipes, state.searchTerm),
        };
      }),

    updateRecipe: (id, patch) =>
      set((state) => {
        const recipes = state.recipes.map((r) => (r.id === id ? { ...r, ...patch } : r));
        return {
          recipes,
          filteredRecipes: applyFilter(recipes, state.searchTerm),
        };
      }),

    deleteRecipe: (id) =>
      set((state) => {
        const recipes = state.recipes.filter((r) => r.id !== id);
        return {
          recipes,
          filteredRecipes: applyFilter(recipes, state.searchTerm),
        };
      }),

    setRecipes: (recipes) =>
      set((state) => ({
        recipes,
        filteredRecipes: applyFilter(recipes, state.searchTerm),
      })),
  };
});
