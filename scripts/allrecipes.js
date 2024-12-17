const container = document.getElementById('recipesContainer');
const apiKey = "20d3c57972d94b619800de090d1fe9bb";
const loader = document.getElementById('loader');
let page = 1;
let loading = false;

async function fetchRecipes(page) {
    try {
        const response = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=12&offset=${(page - 1) * 12}`
        );
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        return data.results;
    } 
    catch (error) {
        console.error("Error al obtener recetas:", error);
        return [];
    }
}

function displayRecipes(recipes) {
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <a href="https://spoonacular.com/recipes/${recipe.title.replace(/\s+/g, '-').toLowerCase()}-${recipe.id}" target="_blank">View Recipe</a>
        `;
        container.appendChild(recipeCard);
    });
}

async function loadMoreRecipes() {
    if (loading) return;
    loading = true;
    loader.style.display = "block";

    const recipes = await fetchRecipes(page);
    if (recipes.length > 0) {
        displayRecipes(recipes);
        page++;
    } 
    else {
        loader.innerText = "No more recipes to load.";
    }

    loading = false;
    loader.style.display = "none";
}

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        loadMoreRecipes();
    }
});

loadMoreRecipes();