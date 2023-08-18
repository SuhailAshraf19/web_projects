const loginForm = document.getElementById('loginForm');
const priceList = document.getElementById('priceList');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // You can perform user authentication here (not shown in this snippet)
    
    // Simulate fetching flight prices from the server
    const flightPrices = await fetchFlightPrices();
    displayFlightPrices(flightPrices);
});

async function fetchFlightPrices() {
    // Simulate fetching flight prices from the server (replace with API call)
    return [
        { origin: 'New York', destination: 'Los Angeles', price: '$300' },
        { origin: 'Chicago', destination: 'Miami', price: '$250' },
        // ...
    ];
}

function displayFlightPrices(prices) {
    priceList.innerHTML = '';
    prices.forEach((flight) => {
        const flightElement = document.createElement('div');
        flightElement.classList.add('flight');
        flightElement.innerHTML = `
            <p><strong>From:</strong> ${flight.origin}</p>
            <p><strong>To:</strong> ${flight.destination}</p>
            <p><strong>Price:</strong> ${flight.price}</p>
        `;
        priceList.appendChild(flightElement);
    });
}
