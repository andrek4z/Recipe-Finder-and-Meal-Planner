import {api} from './api.js'

const container = document.getElementById('recipesContainer');
const loader = document.getElementById('loader');
let page = 1;
let loading = false;

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

    const searchTerm = window.sessionStorage.getItem('search-term') ?? undefined

    const recipes = await api.getRecipes(searchTerm, page)
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

// Too slow, use intersection observer is the best alternative 😉
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
        loadMoreRecipes();
    }
});

loadMoreRecipes();