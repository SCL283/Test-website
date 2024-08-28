const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // To handle CORS issues

const app = express();
const PORT = process.env.PORT || 3000; // Use PORT from environment or fallback to 3000
const DATA_FILE = path.join(__dirname, 'recipes.json');

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS
app.use(express.static(path.join(__dirname, '../frontend')));

// Load existing recipes
function loadRecipes() {
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify([])); // Initialize with empty array
    }
    return JSON.parse(fs.readFileSync(DATA_FILE)); // Read and parse JSON file
}

// Save recipes
function saveRecipes(recipes) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(recipes, null, 2)); // Format JSON with indentation
}

// Get all recipes
app.get('/api/recipes', (req, res) => {
    try {
        const recipes = loadRecipes();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load recipes' });
    }
});

// Add a new recipe
app.post('/api/recipes', (req, res) => {
    try {
        const recipes = loadRecipes();
        recipes.push(req.body);
        saveRecipes(recipes);
        res.status(201).json(req.body);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save recipe' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
