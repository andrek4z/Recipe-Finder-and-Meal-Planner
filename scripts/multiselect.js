// Código para manejar el filtro
const filterButton = document.getElementById('filterButton');
const filterDropdown = document.getElementById('filterDropdown');
const filterOptions = document.querySelectorAll('.filter-option');

let selectedFilters = [];

// Mostrar/ocultar el menú de filtros
filterButton.addEventListener('click', () => {
    filterDropdown.classList.toggle('show');
});

// Actualizar los filtros seleccionados
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
    // Reinicia la lista de recetas y el contador de página
    container.innerHTML = '';
    page = 1;
    loadMoreRecipes();
}

async function loadMoreRecipes() {
    if (loading) return;
    loading = true;
    loader.style.display = "block";

    const searchTerm = window.sessionStorage.getItem('search-term') ?? undefined;

    // Incluir filtros en la solicitud
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