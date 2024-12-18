const API_KEY = "20d3c57972d94b619800de090d1fe9bb"
const BASE_URL = "https://api.spoonacular.com"

const options = {
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': API_KEY
  }
}

export const api = {
    getRecipes: async (searchTerm, page = 1) => {
      const query = (searchTerm !== undefined) ? `&query=${searchTerm}` : ''

      try {
        const response = await fetch(
          `${BASE_URL}/recipes/complexSearch?number=12&offset=${(page - 1) * 12}${query}`,
          options
        )
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`)
        const data = await response.json()
        return data.results;
      }
      catch (error) {
        console.error("Error getting recipes:", error.message);
        return [];
      }
    },
    getTrendingRecipes: async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/recipes/random?number=6`,
          options
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