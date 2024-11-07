// Import necessary hooks and components from React and React Router.
import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';

// Import the stylesheet for the Diet component.
import './CSS/Diet.css';  

// Import the authentication context to manage user access.
import { AuthContext } from '../Context/AuthenticationContext';

const Diet = () => {
    // State variables to manage user input, selected diet option, recipe list, and errors.
    const [input, setInput] = useState('');
    const [dietOption, setDietOption] = useState('loss');
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState('');
    const { authenticatedUser } = useContext(AuthContext);

    // Redirect unauthenticated users to the login page.
    if (!authenticatedUser) {
        return <Navigate to="/login" />;
    }

    // Function to fetch recipes based on the user's input and selected diet option.
    const fetchRecipes = () => {
        const app_id = "c145adca";  
        const app_key = "467ae22cb8d46556b258ce76e70de6b7"; 
        const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${input}&app_id=${app_id}&app_key=${app_key}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                let sortedRecipes = data.hits.map(item => item.recipe);
                sortedRecipes.sort((a, b) => (dietOption === "loss" ? a.calories - b.calories : b.calories - a.calories));
                setRecipes(sortedRecipes.slice(0, 3));
            })
            .catch(err => {
                console.error('Error fetching recipes:', err);
                setError('Error fetching recipes. Please try again later.');
            });
    };

    // Render the Diet component with form controls and recipe display.
    return (
        <div className="dietPage">
            <h1>Advanced Recipe Finder</h1>
            <input 
                type="text"
                id="searchInput"
                placeholder="Enter a food item (e.g., chicken)"
                value={input}
                onChange={e => setInput(e.target.value)}
            />
            <select id="dietOption" value={dietOption} onChange={e => setDietOption(e.target.value)}>
                <option value="loss">Weight-Loss</option>
                <option value="gain">Weight-Gain</option>
            </select>
            <button onClick={fetchRecipes}>Search Recipes</button>
            <div id="recipes" style={{marginTop: '20px'}}>
                {error && <p>{error}</p>}
                {recipes.map((recipe, index) => (
                    <div key={index}>
                        <h3>{recipe.label}</h3>
                        <p><img src={recipe.image} alt={recipe.label} style={{width: '200px', height: 'auto'}} /></p>
                        <p>Calories: {Math.round(recipe.calories)}</p>
                        <a href={recipe.url} target="_blank" rel="noopener noreferrer">View Recipe</a>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Export the Diet component as the default export.
export default Diet;
