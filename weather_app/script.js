   // Placeholder for JavaScript functions
   const apiKey = '9f92c254daf14723b429acd75b9e95f8';
   let latitude;
   let longitude;
   document.getElementById('search-button').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    
    // Add AJAX call to fetch weather data and update map
    console.log(`Fetching weather for ${city}`);
});
function getLocation() {
    const api_Key = 'daa39d7366e58a'; // Replace with your IPinfo token
    const url = `https://ipinfo.io/json?token=${api_Key}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const loc = data.loc.split(',');
             latitude = loc[0];
             longitude = loc[1];
            document.getElementById('location-info').innerHTML =
                `Latitude: ${latitude}<br>Longitude: ${longitude}`;
                 
                getLocationName(latitude, longitude);    
                 initializeMap(latitude, longitude); 
        })
        .catch(error => {
            console.error('Error fetching location data:', error);
            document.getElementById('location-info').innerHTML = "Error fetching location data.";
        });
}
function getLocationName(latitude, longitude) {
     // Replace with your OpenCage API key
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                const locationName = data.results[0].formatted;
                document.getElementById('location-info2').innerHTML = `Location: ${locationName}`;
                document.getElementById('city-input').value = locationName;
            } else {
                document.getElementById('location-info2').innerHTML = "Unable to retrieve location name.";
                document.getElementById('city-input').value = "Location not found";
            }
        })
        .catch(error => {
            document.getElementById('city-input').value = "Error fetching location name";
            console.error("Error fetching location name:", error);
            document.getElementById('location-info2').innerHTML = "Error fetching location name.";
        });
}
window.onload = function() {
    getLocation();
};
let map;
let marker;
function initializeMap(lat, lng) {
     map = L.map('map').setView([lat, lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    marker = L.marker([lat, lng]).addTo(map);

    map.on('click', function(e) {
        latitude = e.latlng.lat;
        longitude = e.latlng.lng;

        marker.setLatLng([latitude, longitude]);

        document.getElementById('location-info').innerHTML =
            `Latitude: ${latitude}<br>Longitude: ${longitude}`;

        // Call the function to update the location name based on new coordinates
        getLocationName(latitude, longitude);
    });
}

        // Assuming you already have this function defined elsewhere
        function search_weather() {
            const city = document.getElementById('city-input').value;
            
            if (city) {
                // Store the city name/address in sessionStorage
                sessionStorage.setItem('selectedcity', city);
                sessionStorage.setItem('latitude', latitude);
                sessionStorage.setItem('longitude', longitude);
                // Navigate to weather_details.html in the same tab
                window.location.href = `weather_details.html`;
            } else {
                alert('Please enter a city name!');
            }
        }
// Function to handle autocomplete and map update

function getCitySuggestions() {
    const query = document.getElementById('city-input').value;

    if (query.length > 2) { // Start searching after 2 characters
        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${apiKey}&limit=10&language=en`)
            .then(response => response.json())
            .then(data => {
                const suggestionsDiv = document.getElementById('suggestions');
                suggestionsDiv.innerHTML = ''; // Clear previous suggestions

                data.results.forEach(result => {
                    const city = result.components.city || 
                                 result.components.town || 
                                 result.components.village || 
                                 result.components.hamlet || 
                                 result.components.suburb || 
                                 result.components.neighbourhood || 
                                 result.components.road || 
                                 result.components.postcode || 
                                 result.components.county || 
                                 result.components.state || 
                                 result.components.country || 
                                 result.formatted;

                    if (city) {
                        const suggestion = document.createElement('div');
                        suggestion.className = 'suggestion';
                        suggestion.textContent = city;
                        suggestion.onclick = () => selectCity(city);
                        suggestionsDiv.appendChild(suggestion);
                    }
                });
            })
            .catch(error => console.error('Error fetching city suggestions:', error));
    }
   
}


function selectCity(city) {
    document.getElementById('city-input').value = city;
    document.getElementById('suggestions').innerHTML = ''; // Clear suggestions
    getLatLngFromCity(city).then(coords => {
        if (coords) {
            latitude=coords.lat;
            longitude=coords.lng;
            updateMap(latitude,  longitude);
            document.getElementById('location-info').innerHTML =
            `Latitude: ${latitude}<br>Longitude: ${ longitude}`;
             
            getLocationName(latitude,  longitude); 

            
        } else {
            console.error('Could not update the map, coordinates not found');
        }
    });
    
}
function getLatLngFromCity(cityName) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(cityName)}&key=${apiKey}`;

    return fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                const lat = data.results[0].geometry.lat;
                const lng = data.results[0].geometry.lng;
                return { lat, lng };
            } else {
                throw new Error('No results found for the city');
            }
        })
        .catch(error => {
            console.error('Error fetching latitude and longitude:', error);
            return null;
        });
}
function updateMap(latitude, longitude) {
    if (!map) {
        // Initialize the map if it hasn't been initialized yet
        map = L.map('map').setView([latitude, longitude], 13);

        // Add the OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);

    } else {
        // If the map is already initialized, just update its view
        map.setView([latitude, longitude], 13);
    }

    // Clear existing markers
    if (map.hasLayer(marker)) {
        marker.setLatLng([latitude, longitude]);
    }

    // Add a marker to the map at the new coordinates

}
