import { create } from "zustand";

export const useRecipeStore = create((set, get) => {
  // simple relevance score: overlap of ingredients with favorites
  const scoreByOverlap = (recipe, likedSet, all) => {
    const ing = new Set((recipe.ingredients || []).map((x) => String(x).toLowerCase()));
    let score = 0;
    for (const favId of likedSet) {
      const fav = all.find((r) => r.id === favId);
      if (!fav) continue;
      const favIng = new Set((fav.ingredients || []).map((x) => String(x).toLowerCase()));
      for (const i of ing) if (favIng.has(i)) score += 1;
    }
    // light boost for title/desc matches against current searchTerm (optional)
    const q = (get().searchTerm || "").trim().toLowerCase();
    if (q) {
      const t = (recipe.title || "").toLowerCase();
      const d = (recipe.description || "").toLowerCase();
      if (t.includes(q) || d.includes(q)) score += 0.5;
    }
    return score;
  };

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
    // core data
    recipes: [],
    filteredRecipes: [],
    searchTerm: "",

    // favorites & recs
    favorites: [],                        // ← array of recipe IDs
    recommendations: [],                  // ← store cached recommendations

    // search
    setSearchTerm: (term) => {
      const { recipes } = get();
      set({
        searchTerm: term,
        filteredRecipes: applyFilter(recipes, term),
      });
    },

    // CRUD
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
        const favorites = state.favorites.filter((fid) => fid !== id); // remove if favorited
        return {
          recipes,
          favorites,
          filteredRecipes: applyFilter(recipes, state.searchTerm),
          recommendations: get().generateRecommendationsInternal(recipes, favorites),
        };
      }),

    setRecipes: (recipes) =>
      set((state) => ({
        recipes,
        filteredRecipes: applyFilter(recipes, state.searchTerm),
        recommendations: get().generateRecommendationsInternal(recipes, state.favorites),
      })),

    // favorites
    addFavorite: (recipeId) =>
      set((state) => {
        if (state.favorites.includes(recipeId)) return {};
        const favorites = [...state.favorites, recipeId];
        return {
          favorites,
          recommendations: get().generateRecommendationsInternal(state.recipes, favorites),
        };
      }),

    removeFavorite: (recipeId) =>
      set((state) => {
        const favorites = state.favorites.filter((id) => id !== recipeId);
        return {
          favorites,
          recommendations: get().generateRecommendationsInternal(state.recipes, favorites),
        };
      }),

    // helper to compute recs (kept in store for easy access)
    generateRecommendationsInternal: (recipes, favorites) => {
      const liked = new Set(favorites);
      // candidates: non-favorited recipes
      const candidates = recipes.filter((r) => !liked.has(r.id));
      const scored = candidates
        .map((r) => ({ r, s: scoreByOverlap(r, liked, recipes) }))
        .filter(({ s }) => s > 0)
        .sort((a, b) => b.s - a.s)
        .slice(0, 10)
        .map(({ r }) => r);
      return scored;
    },

    // public trigger (optional manual refresh)
    generateRecommendations: () => {
      const { recipes, favorites } = get();
      set({ recommendations: get().generateRecommendationsInternal(recipes, favorites) });
    },
  };
});
