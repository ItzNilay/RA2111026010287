// products.js
const http = require('http');

const getAllProducts = async () => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'your-api-hostname.com', // Replace with your API hostname
      path: '/api/products',
      method: 'GET',
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve(JSON.parse(data));
      });
    });

    req.on('error', (error) => {
      console.error('Error fetching products:', error);
      reject(error);
    });

    req.end();
  });
};

const getProductById = async (id) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'your-api-hostname.com', // Replace with your API hostname
      path: `/api/products/${id}`,
      method: 'GET',
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve(JSON.parse(data));
      });
    });

    req.on('error', (error) => {
      console.error('Error fetching product:', error);
      reject(error);
    });

    req.end();
  });
};

module.exports = { getAllProducts, getProductById };
