const apiKey = "affa03f1cf444b7ebd663412252602";

        function getLocationWeather() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    fetchWeather(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`);
                }, error => {
                    alert("Geolocation not available or permission denied.");
                });
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        }
        
        function getCityWeather() {
            const city = document.getElementById("city").value;
            if (city) {
                fetchWeather(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`);
            } else {
                alert("Please enter a city name.");
            }
        }
        
        function fetchWeather(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    document.getElementById("weather").innerHTML = `
                        <h2>${data.location.name}, ${data.location.country}</h2>
                        <p>Temperature: ${data.current.temp_c}°C</p>
                        <p>Weather: ${data.current.condition.text}</p>
                        <p>Humidity: ${data.current.humidity}%</p>
                        <p>Wind Speed: ${data.current.wind_kph} kph</p>
                    `;
                })
                .catch(error => {
                    alert("Error fetching weather data. Please check the city name or try again later.");
                });
        }