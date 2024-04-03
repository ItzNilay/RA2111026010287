const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

// Dummy e-commerce API URLs
const ecommerceApis = [
    'http://api.companya1.com',
    'http://api.companyb2.com',
    'http://api.companyc3.com',
    'http://api.companyd4.com',
    'http://api.companye5.com',
];

// Helper function to fetch products from each e-commerce API
async function fetchProductsFromApi(apiUrl, category) {
    try {
        const response = await axios.get(`${apiUrl}/categories/${category}/products`);
        return response.data.products;
    } catch (error) {
        console.error(`Error fetching products from ${apiUrl}: ${error.message}`);
        return [];
    }
}

// Fetch top N products from all e-commerce APIs
async function fetchTopProducts(category, n) {
    let allProducts = [];
    for (const apiUrl of ecommerceApis) {
        const products = await fetchProductsFromApi(apiUrl, category);
        allProducts = allProducts.concat(products);
    }
    // Sort products by rating in descending order
    allProducts.sort((a, b) => b.rating - a.rating);
    // Take top N products
    const topProducts = allProducts.slice(0, n);
    return topProducts;
}

// Endpoint to fetch top N products within a category
app.get('/categories/:categoryname/products', async (req, res) => {
    const category = req.params.categoryname;
    const n = parseInt(req.query.n) || 10;
    const page = parseInt(req.query.page) || 1;
    try {
        const topProducts = await fetchTopProducts(category, n);
        // Implement pagination
        const startIndex = (page - 1) * n;
        const endIndex = startIndex + n;
        const paginatedProducts = topProducts.slice(startIndex, endIndex);
        res.json(paginatedProducts);
    } catch (error) {
        console.error(`Error fetching top products: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to fetch details of a specific product
app.get('/categories/:categoryname/products/:productid', async (req, res) => {
    const productId = req.params.productid;
    // Implement logic to fetch product details by ID
    try {
        // Dummy implementation: return product ID and name
        res.json({ id: productId, name: `Product ${productId}` });
    } catch (error) {
        console.error(`Error fetching product details: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
