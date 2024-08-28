// Function to fetch recipes from the server
function fetchRecipes() {
    return fetch('/api/recipes')
        .then(response => response.json())
        .then(data => data);
}

// Function to submit a new recipe to the server
function submitRecipe(recipe) {
    return fetch('/api/recipes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(recipe)
    });
}

// Event listener for DOMContentLoaded to set up initial page state
document.addEventListener('DOMContentLoaded', () => {
    const recipeList = document.getElementById('recipe-list');
    const form = document.getElementById('recipe-form');

    // Load recipes from the server and display them
    fetchRecipes().then(data => {
        data.forEach(recipe => {
            const li = document.createElement('li');
            li.textContent = `${recipe.name}: ${recipe.description}`;
            recipeList.appendChild(li);
        });
    });

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;

        submitRecipe({ name, description }).then(() => {
            const li = document.createElement('li');
            li.textContent = `${name}: ${description}`;
            recipeList.appendChild(li);

            // Clear form fields
            form.reset();
        });
    });
});
