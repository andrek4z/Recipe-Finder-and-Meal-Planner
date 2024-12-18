import { api } from './api.js'

const $trendingContainer = document.querySelector(".trending-recipes")

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

displayTrendingRecipes()