const filterButton = document.getElementById('filterButton');
const filterDropdown = document.getElementById('filterDropdown');
const filterOptions = document.querySelectorAll('.filter-option');

let selectedFilters = [];

filterButton.addEventListener('click', () => {
    filterDropdown.classList.toggle('show');
});

filterOptions.forEach(option => {
    option.addEventListener('change', () => {
        const value = option.value;
        if (option.checked) {
            selectedFilters.push(value);
        } else {
            selectedFilters = selectedFilters.filter(filter => filter !== value);
        }
        resetAndLoadRecipes();
    });
});

function resetAndLoadRecipes() {
    container.innerHTML = '';
    page = 1;
    loadMoreRecipes();
}

async function loadMoreRecipes() {
    if (loading) return;
    loading = true;
    loader.style.display = "block";

    const searchTerm = window.sessionStorage.getItem('search-term') ?? undefined;

    const recipes = await api.getRecipes(searchTerm, page, selectedFilters);
    if (recipes.length > 0) {
        displayRecipes(recipes);
        page++;
    } else {
        loader.innerText = "No more recipes to load.";
    }

    loading = false;
    loader.style.display = "none";
}