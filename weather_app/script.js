   // Placeholder for JavaScript functions
   document.getElementById('search-button').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;
    // Add AJAX call to fetch weather data and update map
    console.log(`Fetching weather for ${city}`);
});
function getLocation() {
    const apiKey = 'daa39d7366e58a'; // Replace with your IPinfo token
    const url = `https://ipinfo.io/json?token=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const loc = data.loc.split(',');
            const latitude = loc[0];
            const longitude = loc[1];
            document.getElementById('location-info').innerHTML =
                `Latitude: ${latitude}<br>Longitude: ${longitude}`;
                 getLocationName(latitude, longitude);     
        })
        .catch(error => {
            console.error('Error fetching location data:', error);
            document.getElementById('location-info').innerHTML = "Error fetching location data.";
        });
}
function getLocationName(latitude, longitude) {
    const apiKey = '9f92c254daf14723b429acd75b9e95f8'; // Replace with your OpenCage API key
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
    getLocationName(latitude, longitude);
};

