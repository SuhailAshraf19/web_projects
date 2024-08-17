const city = sessionStorage.getItem('selectedcity');
const lat = sessionStorage.getItem('latitude');
const lng = sessionStorage.getItem('longitude');

document.addEventListener('DOMContentLoaded', function () {
    // Retrieve the city from sessionStorage

    if (city) {
        // Display the city name or full address in the div
        document.getElementById('city_name').innerHTML = `Address: ${city}`;
    
        // Call the function to fetch weather details
        fetch_weatherdetailsByCoordinates(lat, lng);
        fetchforecastDetails(lat, lng);
    } else {
        document.getElementById('city_name').textContent = 'No city found!';
    }
});

function fetch_weatherdetailsByCoordinates(lat, lng) {
    const apiKey = '4cac586c12422d59f72b1e4df224bbb4'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`;
     fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch weather details');
            }
            return response.json();
        })
        .then(data => {
            // Extract and display weather details
            const weatherDetails = `
    
                <p><strong>Weather:</strong> ${data.weather[0].main} (${data.weather[0].description})</p>
                <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
                <p><strong>Feels Like:</strong> ${data.main.feels_like}°C</p>
                <p><strong>Min Temperature:</strong> ${data.main.temp_min}°C</p>
                <p><strong>Max Temperature:</strong> ${data.main.temp_max}°C</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Pressure:</strong> ${data.main.pressure} hPa</p>
                <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
                <p><strong>Wind Direction:</strong> ${data.wind.deg}°</p>
                <p><strong>Cloudiness:</strong> ${data.clouds.all}%</p>
                <p><strong>Visibility:</strong> ${data.visibility} meters</p>
                <p><strong>Sunrise:</strong> ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
                <p><strong>Sunset:</strong> ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
            
            `;
          
            
            document.getElementById('weather-info').innerHTML = weatherDetails;
        
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('weather-info').textContent = 'Unable to fetch weather details.';
            
        });
}
function fetchforecastDetails(latitude, longitude) {
    const apiKey = '4cac586c12422d59f72b1e4df224bbb4';  // Replace with your OpenWeatherMap API key
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayForecast(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function displayForecast(data) {
    
    data.list.forEach(entry => {
        const dateTime = new Date(entry.dt * 1000).toLocaleString();
        const weather = entry.weather[0].description;
        const temp = entry.main.temp;
        const humidity = entry.main.humidity;
        const windSpeed = entry.wind.speed;
        const forecastContainer = document.getElementById('forecast-details');
        forecastContainer.innerHTML = '';

        forecastContainer.innerHTML += `
            <div>
                <h4>${dateTime}</h4>
                <p>Weather: ${weather}</p>
                <p>Temperature: ${temp}°C</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${windSpeed} m/s</p>
            </div>
            <hr>
        `;
    });
}
