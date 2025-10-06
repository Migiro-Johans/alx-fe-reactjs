import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  return (
    <article
      className="group bg-white rounded-2xl shadow-sm ring-1 ring-black/5 overflow-hidden
                 transition hover:shadow-lg hover:-translate-y-0.5"
    >
      <div className="aspect-[3/2] overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold leading-tight line-clamp-2">
          {recipe.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3">{recipe.summary}</p>

        {/* Link to detail page (will work once you add routing) */}
        <div className="pt-2">
          <Link
            to={`/recipe/${recipe.id}`}
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2
                       bg-blue-600 text-white text-sm font-medium
                       hover:bg-blue-700 focus:outline-none focus-visible:ring-2"
          >
            View Recipe
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
export default RecipeCard;
