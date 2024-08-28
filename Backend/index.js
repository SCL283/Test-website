const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'recipes.json');

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Load existing recipes
function loadRecipes() {
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify([]));
    }
    return JSON.parse(fs.readFileSync(DATA_FILE));
}

// Save recipes
function saveRecipes(recipes) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(recipes));
}

// Get all recipes
app.get('/api/recipes', (req, res) => {
    res.json(loadRecipes());
});

// Add a new recipe
app.post('/api/recipes', (req, res) => {
    const recipes = loadRecipes();
    recipes.push(req.body);
    saveRecipes(recipes);
    res.status(201).json(req.body);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
