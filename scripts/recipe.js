const apiKey = "20d3c57972d94b619800de090d1fe9bb";
const trendingContainer = document.querySelector(".trending-recipes");

async function getTrendingRecipes() {
    try {
        const response = await fetch(
            `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=6`            
        );
            
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        const recipes = data.recipes;

        displayTrendingRecipes(recipes);
    } 
    catch (error) {
        console.error("Error getting recipes:", error);
        trendingContainer.innerHTML = "<p>There was an error loading the recipes.</p>";
    }
}

function displayTrendingRecipes(recipes) {
    trendingContainer.innerHTML = ""; 
        
    recipes.forEach(recipe => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}" width="200">
            <h3>${recipe.title}</h3>
            <a href="${recipe.sourceUrl}" target="_blank">Watch Recipe</a>
        `;

        trendingContainer.appendChild(recipeCard);
    });
}

getTrendingRecipes();