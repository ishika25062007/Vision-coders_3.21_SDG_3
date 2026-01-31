// 🔑 KEYS & CONFIG
// Switched to WeatherAPI.com
const API_KEY = typeof CONFIG !== 'undefined' ? CONFIG.WEATHER_API_KEY : "";
const BASE_URL = "https://api.weatherapi.com/v1/";

let chartInstance = null;

// 🚀 INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
    // Default search
    searchWeather("Mumbai");

    // Enter key listener
    document.getElementById("cityInput").addEventListener("keypress", (e) => {
        if (e.key === "Enter") searchWeather();
    });
});

// 🔍 SEARCH FUNCTION
async function searchWeather(query) {
    const city = query || document.getElementById("cityInput").value;
    if (!city) return;

    if (!API_KEY || API_KEY.includes("YOUR")) {
        showError("⚠️ API Key is missing! Using Mock Data.");
        loadMockData(city);
        return;
    }

    try {
        // Fetch Forecast (Includes Current)
        // Days=3 to get enough hourly data for trend
        const res = await fetch(`${BASE_URL}forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=no&alerts=no`);
        const data = await res.json();

        if (data.error) {
            showError(`❌ ${data.error.message}`);
            return;
        }

        updateUI(data);
        hideError();

    } catch (error) {
        console.error(error);
        showError("⚠️ Failed to fetch. Check network.");
    }
}

// 🎨 UPDATE UI
function updateUI(data) {
    document.getElementById("weatherGrid").style.display = "grid";

    const current = data.current;
    const location = data.location;
    const forecastDays = data.forecast.forecastday;

    // Main Card
    document.getElementById("cityName").innerText = `${location.name}, ${location.country}`;
    document.getElementById("date").innerText = new Date(location.localtime).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' });
    document.getElementById("temperature").innerText = `${Math.round(current.temp_c)}°C`;
    document.getElementById("weatherDesc").innerText = current.condition.text;
    document.getElementById("weatherIcon").src = `https:${current.condition.icon}`; // Add https protocol

    document.getElementById("humidity").innerText = `${current.humidity}%`;
    document.getElementById("windSpeed").innerText = `${Math.round(current.wind_kph)} km/h`;
    document.getElementById("visibility").innerText = `${current.vis_km} km`;

    // Dynamic Background
    updateBackground(current.condition.text);

    // Chart & Forecast
    updateChart(forecastDays[0].hour); // First day hourly data
    updateForecastRow(forecastDays);
}

// 🎞️ LIVE BACKGROUNDS
function updateBackground(condition) {
    const bg = document.getElementById("weather-bg");
    const text = condition.toLowerCase();
    let url = "";

    if (text.includes("sun") || text.includes("clear")) {
        url = "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?q=80&w=1974";
    } else if (text.includes("cloud") || text.includes("overcast")) {
        url = "https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=1951";
    } else if (text.includes("rain") || text.includes("drizzle") || text.includes("mist")) {
        url = "https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=2070";
    } else if (text.includes("thunder") || text.includes("storm")) {
        url = "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?q=80&w=2071";
    } else if (text.includes("snow") || text.includes("ice") || text.includes("blizzard")) {
        url = "https://images.unsplash.com/photo-1547756536-cde3673fa2e5?q=80&w=2141";
    } else if (text.includes("fog") || text.includes("haze")) {
        url = "https://images.unsplash.com/photo-1485230905346-71acb9518d9c?q=80&w=2094";
    } else {
        url = "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?q=80&w=1974"; // Default
    }

    bg.style.backgroundImage = `url('${url}')`;
}

// 📈 CHART UPDATE (Hourly Forecast)
function updateChart(hourlyData) {
    const ctx = document.getElementById("tempChart").getContext("2d");

    // Filter: Get every 3rd hour for the next 24h visualization
    // WeatherAPI returns 24 hours for the day. We'll show the rest of the day.
    // Or just show 24 hours of the current day for simplicity and trends.
    const intervals = hourlyData.filter((_, index) => index % 3 === 0);

    const labels = intervals.map(item => {
        const date = new Date(item.time);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    });
    const temps = intervals.map(item => item.temp_c);

    if (chartInstance) chartInstance.destroy();

    chartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: temps,
                borderColor: '#fff',
                backgroundColor: 'rgba(255,255,255,0.2)',
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { ticks: { color: 'white' }, grid: { display: false } },
                y: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.1)' } }
            },
            plugins: { legend: { display: false } }
        }
    });
}

// 🗓️ FORECAST ROW
function updateForecastRow(forecastDays) {
    const row = document.getElementById("forecastRow");
    row.innerHTML = "";

    // Skip today, show next few days if available, or just show all returned
    forecastDays.forEach(dayInfo => {
        const dateObj = new Date(dayInfo.date);
        const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
        const icon = dayInfo.day.condition.icon;
        const temp = Math.round(dayInfo.day.avgtemp_c);
        const desc = dayInfo.day.condition.text;

        const card = document.createElement("div");
        card.className = "forecast-card";
        card.innerHTML = `
            <p>${dayName}</p>
            <img src="https:${icon}" alt="icon">
            <h3>${temp}°C</h3>
            <p style="font-size:12px;">${desc}</p>
        `;
        row.appendChild(card);
    });
}

// ⚠️ MOCK DATA FALLBACK (If key fails)
function loadMockData(city) {
    const mockData = {
        location: { name: city, country: "Demo", localtime: new Date().toISOString() },
        current: {
            temp_c: 28,
            condition: { text: "Partly cloudy", icon: "//cdn.weatherapi.com/weather/64x64/day/116.png" },
            humidity: 60,
            wind_kph: 15,
            vis_km: 10
        },
        forecast: {
            forecastday: Array(5).fill(0).map((_, i) => ({
                date: new Date(Date.now() + i * 86400000).toISOString(),
                day: {
                    avgtemp_c: 25 + i,
                    condition: { text: "Sunny", icon: "//cdn.weatherapi.com/weather/64x64/day/113.png" }
                },
                hour: Array(24).fill(0).map((_, h) => ({
                    time: new Date().setHours(h),
                    temp_c: 20 + (h / 2)
                }))
            }))
        }
    };
    updateUI(mockData);
}

function showError(msg) {
    const box = document.getElementById("errorMsg");
    box.style.display = "block";
    box.innerText = msg;
}

function hideError() {
    document.getElementById("errorMsg").style.display = "none";
}
