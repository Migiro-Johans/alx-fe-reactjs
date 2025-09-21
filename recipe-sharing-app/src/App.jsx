import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RecipeList from './components/RecipeList.jsx'
import { Routes, Route, Router, Link } from 'react-router-dom'
import AddRecipeForm from './components/AddRecipeForm.jsx'
import RecipeDetails from './components/RecipeDetails'
import SearchBar from './components/SearchBar.jsx'
function App() {
  const [Recipe, newRecipe] = useState();

  return (
    <>
	  <div>
	  <h1> Recipe Sharing App </h1>
	  	<SearchBar/>
	  	<RecipeList/>
	  </div>
	  <div>
	 	<AddRecipeForm/>
	  </div>
    </>
  )
}

export default App(){
  return (
    <Router>
      <header style={{ padding: "1rem" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          Home
        </Link>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
      </Routes>
    </Router>
  );
}
