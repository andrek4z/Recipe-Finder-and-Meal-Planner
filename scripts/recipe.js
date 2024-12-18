import { api } from './api.js'

const $trendingContainer = document.querySelector(".trending-recipes")
const $searchForm = document.getElementById('search-form')

async function displayTrendingRecipes() {
    const trendingRecipes = await api.getTrendingRecipes()

    if (trendingRecipes === null) {
        $trendingContainer.innerHTML = "<p>There was an error loading the recipes.</p>"
        return
    }

    trendingRecipes.forEach(recipe => {
        const recipeCard = document.createElement("div")
        recipeCard.classList.add("recipe-card");
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}" width="200">
            <h3>${recipe.title}</h3>
            <a href="${recipe.sourceUrl}" target="_blank">Watch Recipe</a>
        `

        $trendingContainer.appendChild(recipeCard);
    })
}

$searchForm.onsubmit = (event) => {
    event.preventDefault()
    const searchTerm = document.getElementById('search-recipe').value
    window.sessionStorage.setItem('search-term', searchTerm)
    window.location.href = '/recipes.html'
}

window.addEventListener('load', async () => {
    window.sessionStorage.removeItem('search-term')
    await displayTrendingRecipes()
})
