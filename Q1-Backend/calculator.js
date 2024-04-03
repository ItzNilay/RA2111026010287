const express = require('express');
const axios = require('axios');
const app = express();

const WINDOW_SIZE = 10;
let window = [];
const TEST_SERVER_URL = "http://test-server.com/numbers";

// Function to fetch numbers from the test server
async function fetchNumbers() {
    try {
        const response = await axios.get(TEST_SERVER_URL, { timeout: 500 });
        if (response.status === 200) {
            return response.data;
        } else {
            return [];
        }
    } catch (error) {
        return [];
    }
}

// Function to calculate average of an array of numbers
function calculateAverage(numbers) {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    return sum / numbers.length;
}

// Function to update window with new numbers
function updateWindow(newNumbers) {
    window = window.concat(newNumbers).slice(-WINDOW_SIZE);
}

// Endpoint to handle incoming requests
app.get('/numbers/:numberid', async (req, res) => {
    const numberid = req.params.numberid;
    const numbers = await fetchNumbers();
    let currentNumbers = [];

    if (numberid.includes('p')) {
        currentNumbers = numbers.filter(num => {
            if (num <= 1) return false;
            for (let i = 2; i <= Math.sqrt(num); i++) {
                if (num % i === 0) return false;
            }
            return true;
        });
    } else if (numberid.includes('f')) {
        function fibonacci(n) {
            let fib = [0, 1];
            while (fib.length < n) {
                fib.push(fib[fib.length - 1] + fib[fib.length - 2]);
            }
            return fib;
        }
        currentNumbers = fibonacci(WINDOW_SIZE);
    } else if (numberid.includes('e')) {
        currentNumbers = numbers.filter(num => num % 2 === 0);
    } else if (numberid.includes('r')) {
        currentNumbers = numbers;
    } else {
        return res.status(400).json({ error: 'Invalid numberid' });
    }

    updateWindow(currentNumbers);
    const average = calculateAverage(window);

    const response = {
        test_server_numbers: numbers,
        window_previous_state: window.slice(0, -1),
        window_current_state: window.slice(-1)[0],
        average: average
    };

    res.json(response);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
