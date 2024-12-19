import { api } from './api.js';

const filterButton = document.getElementById('filterButton');
const filterDropdown = document.getElementById('filterDropdown');
const recipesContainer = document.getElementById('recipesContainer');
const loader = document.getElementById('loader');

let page = 1;
let loading = false;
let currentFilters = [];

filterButton.addEventListener('click', () => {
    filterDropdown.classList.toggle('show');
});

function getSelectedFilters() {
    const checkboxes = filterDropdown.querySelectorAll('input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.value);
}

async function loadRecipesWithFilters() {
    currentFilters = getSelectedFilters();
    console.log("Filtros seleccionados:", currentFilters);

    recipesContainer.innerHTML = '';
    page = 1;

    await loadMoreRecipes(currentFilters);
}

async function loadMoreRecipes(filters = []) {
    if (loading) return;
    loading = true;
    loader.style.display = "block";

    const searchTerm = window.sessionStorage.getItem('search-term') ?? undefined;

    try {
        const recipes = await api.getRecipes(searchTerm, page, filters);
        if (recipes.length > 0) {
            displayRecipes(recipes);
            page++;
        } else {
            loader.innerText = "No more recipes to load.";
        }
    } catch (error) {
        console.error("Error al cargar las recetas:", error);
    } finally {
        loading = false;
        loader.style.display = "none";
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
        recipesContainer.appendChild(recipeCard);
    });
}

filterDropdown.addEventListener('change', loadRecipesWithFilters);

loadMoreRecipes();
