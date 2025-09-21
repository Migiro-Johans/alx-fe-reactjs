import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RecipeList from './components/RecipeList.jsx'
import AddRecipeForm from './components/AddRecipeForm.jsx'
function App() {
  const [Recipe, newRecipe] = useState();

  return (
    <>
	  <div>
	  <h1> Recipe Sharing App </h1>
	  	<RecipeList/>
	  </div>
	  <div>
	 	<AddRecipeForm/>
	  </div>
    </>
  )
}

export default App
