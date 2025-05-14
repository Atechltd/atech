async function getWeather() {
  const apiKey = "91e33da9aafd6b6beecbabb90c9f70a0"; // <-- Valid key!
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = `<p class="error">Please enter a city name.</p>`;
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q= ${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found or invalid API key");
    }

    const data = await response.json();
    console.log(data); // Debugging line

    const weatherHTML = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <div class="weather-info">
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Feels like:</strong> ${data.main.feels_like}°C</p>
        <p><strong>Condition:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind:</strong> ${data.wind.speed} m/s</p>
      </div>
    `;

    resultDiv.innerHTML = weatherHTML;

  } catch (error) {
    resultDiv.innerHTML = `<p class="error">${error.message}</p>`;
    console.error(error); // Show error in console
  }
}