const API_KEY = "20d3c57972d94b619800de090d1fe9bb"
const BASE_URL = "https://api.spoonacular.com"

export const api = {
    getRecipes: async (page = 1) => {
      try {
        const response = await fetch(
          `${BASE_URL}/recipes/complexSearch?apiKey=${API_KEY}&number=12&offset=${(page - 1) * 12}`
        )
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`)
        const data = await response.json()
        return data.results;
      }
      catch (error) {
        console.error("Error al obtener recetas:", error.message);
        return [];
      }
    },
    getTrendingRecipes: async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/recipes/random?apiKey=${API_KEY}&number=6`
        )

        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`)

        const data = await response.json()
        return data.recipes
      }
      catch (error) {
        console.error("Error getting recipes:", error)
        return null
      }
    }
}