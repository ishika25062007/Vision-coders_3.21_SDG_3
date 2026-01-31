window.onload = function () {

  // 🌍 Create the map (default view before location loads)
  var map = L.map('cesiumContainer').setView([20.5937, 78.9629], 5);

  // 🗺️ OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // 🌡️ AQI Heatmap layer (intensity = pollution level 0–1)

  // 🏙️ Structured City Data (for Search & Heatmap)
  const cities = [
    { name: "Delhi", lat: 28.6139, lon: 77.2090, aqi: 0.95 },
    { name: "Mumbai", lat: 19.0760, lon: 72.8777, aqi: 0.75 },
    { name: "Kolkata", lat: 22.5726, lon: 88.3639, aqi: 0.70 },
    { name: "Chennai", lat: 13.0827, lon: 80.2707, aqi: 0.65 },
    { name: "Bangalore", lat: 12.9716, lon: 77.5946, aqi: 0.60 },
    { name: "Hyderabad", lat: 17.3850, lon: 78.4867, aqi: 0.68 },
    { name: "Jaipur", lat: 26.9124, lon: 75.7873, aqi: 0.62 },
    { name: "Ahmedabad", lat: 23.0225, lon: 72.5714, aqi: 0.64 },
    { name: "Pune", lat: 18.5204, lon: 73.8567, aqi: 0.58 },
    { name: "Surat", lat: 21.1702, lon: 72.8311, aqi: 0.66 },

    { name: "Patna", lat: 25.5941, lon: 85.1376, aqi: 0.72 },
    { name: "Lucknow", lat: 26.8467, lon: 80.9462, aqi: 0.74 },
    { name: "Chandigarh", lat: 30.7333, lon: 76.7794, aqi: 0.61 },
    { name: "Amritsar", lat: 31.6340, lon: 74.8723, aqi: 0.67 },
    { name: "Haridwar", lat: 29.9457, lon: 78.1642, aqi: 0.55 },
    { name: "Dehradun", lat: 30.3165, lon: 78.0322, aqi: 0.53 },

    { name: "Bhopal", lat: 23.2599, lon: 77.4126, aqi: 0.69 },
    { name: "Indore", lat: 22.7196, lon: 75.8577, aqi: 0.71 },
    { name: "Raipur", lat: 21.2514, lon: 81.6296, aqi: 0.63 },
    { name: "Udaipur", lat: 24.5854, lon: 73.7125, aqi: 0.57 },

    { name: "Panaji", lat: 15.4909, lon: 73.8278, aqi: 0.45 },
    { name: "Coimbatore", lat: 11.0168, lon: 76.9558, aqi: 0.50 },
    { name: "Thiruvananthapuram", lat: 8.5241, lon: 76.9366, aqi: 0.42 },
    { name: "Kochi", lat: 9.9312, lon: 76.2673, aqi: 0.46 },
    { name: "Kerala", lat: 10.8505, lon: 76.2711, aqi: 0.48 },

    { name: "Vijayawada", lat: 16.5062, lon: 80.6480, aqi: 0.59 },
    { name: "Nellore", lat: 14.4426, lon: 79.9865, aqi: 0.54 },
    { name: "Vizianagaram", lat: 18.1124, lon: 83.3956, aqi: 0.56 },
    { name: "Bhubaneswar", lat: 20.2961, lon: 85.8245, aqi: 0.67 },
    { name: "Nagpur", lat: 21.1458, lon: 79.0882, aqi: 0.73 },

    { name: "Imphal", lat: 24.8170, lon: 93.9368, aqi: 0.40 },
    { name: "Guwahati", lat: 26.1445, lon: 91.7362, aqi: 0.52 },
    { name: "Shillong", lat: 25.5788, lon: 91.8933, aqi: 0.38 },
    { name: "Gangtok", lat: 27.3389, lon: 88.6065, aqi: 0.35 },
    { name: "Aizawl", lat: 23.7271, lon: 92.7176, aqi: 0.41 },

    { name: "Srinagar", lat: 34.0837, lon: 74.7973, aqi: 0.44 },
    { name: "Jammu", lat: 32.7266, lon: 74.8570, aqi: 0.49 },
    { name: "Shimla", lat: 31.1048, lon: 77.1734, aqi: 0.47 },
    { name: "Dharamshala", lat: 32.2190, lon: 76.3234, aqi: 0.43 },

    { name: "Vadodara", lat: 22.3072, lon: 73.1812, aqi: 0.65 },
    { name: "Cuttack", lat: 20.4625, lon: 85.8830, aqi: 0.60 },
    { name: "Agra", lat: 27.1767, lon: 78.0081, aqi: 0.80 },

    { name: "Kanpur", lat: 26.4499, lon: 80.3319, aqi: 0.76 },
    { name: "Varanasi", lat: 25.3217, lon: 82.9873, aqi: 0.78 },
    { name: "Prayagraj", lat: 25.4358, lon: 81.8463, aqi: 0.70 },
    { name: "Meerut", lat: 28.9846, lon: 77.7060, aqi: 0.72 },
    { name: "Visakhapatnam", lat: 17.6868, lon: 83.2185, aqi: 0.55 },
    { name: "Madurai", lat: 9.9252, lon: 78.1198, aqi: 0.50 },
    { name: "Jodhpur", lat: 26.2389, lon: 73.0243, aqi: 0.61 },
    { name: "Ranchi", lat: 23.3441, lon: 85.3096, aqi: 0.64 },
    { name: "Jamshedpur", lat: 22.8056, lon: 86.2029, aqi: 0.66 },
    { name: "Gwalior", lat: 26.2183, lon: 78.1828, aqi: 0.63 }
  ];

  // Prepare data for Heatmap (requires [lat, lon, intensity])
  var aqiData = cities.map(city => [city.lat, city.lon, city.aqi]);

  // 🔥 ADD HEATMAP LAYER
  if (typeof L !== 'undefined' && L.heatLayer) {
    L.heatLayer(aqiData, {
      radius: 35,
      blur: 20,
      maxZoom: 12,
      max: 1.0,
      minOpacity: 0.4,
      gradient: {
        0.0: 'blue',
        0.4: 'cyan',
        0.6: 'lime',
        0.8: 'orange',
        1.0: 'red'
      }
    }).addTo(map);
  }


  // 🔍 SEARCH FUNCTIONALITY
  const searchInput = document.querySelector(".search-bar");
  const searchBtn = document.querySelector(".search-btn");

  // 📧 EmailJS Initialization
  if (typeof CONFIG !== 'undefined' && CONFIG.EMAILJS_PUBLIC_KEY) {
    emailjs.init(CONFIG.EMAILJS_PUBLIC_KEY);
    console.log("✅ EmailJS Initialized");
  }

  // 🌡️ Risk Levels (EPA Mapping)
  const EPA_RISK_LABELS = {
    1: "Good 🟢",
    2: "Moderate 🟡",
    3: "Unhealthy for Sensitive Groups 🟠",
    4: "Unhealthy 🔴",
    5: "Very Unhealthy 🟣",
    6: "Hazardous ☠️"
  };

  async function sendAlertEmail(cityName, aqiLabel, rawValue) {
    console.log(`📧 Attempting to send alert email for ${cityName}...`);
    try {
      if (typeof getCurrentUser !== 'function') {
        process.env.NODE_ENV !== 'production' && console.warn("getCurrentUser not found");
        return;
      }

      const user = await getCurrentUser();
      if (!user || !user.email) return;

      const templateParams = {
        to_email: user.email,
        to_name: user.email.split('@')[0],
        city: cityName,
        aqi_level: aqiLabel,
        message: `High pollution warning for ${cityName}! The AQI status is ${aqiLabel}. Please take precautions.`
      };

      await emailjs.send(CONFIG.EMAILJS_SERVICE_ID, CONFIG.EMAILJS_TEMPLATE_ID, templateParams);
      console.log("✅ Alert email sent to:", user.email);
    } catch (err) {
      console.error("❌ Email failed:", err);
    }
  }

  function showAQINotification(cityName, aqiLabel, epaIndex) {
    const modal = document.getElementById("aqi-alert-modal");
    if (!modal) return;

    // Adjust title and icon based on severity
    const isAlert = epaIndex >= 3;
    const title = isAlert ? "Pollution Alert" : "Air Quality Update";
    const icon = isAlert ? "⚠️" : "ℹ️";

    // Update Modal Header
    modal.querySelector("h3").innerText = title;
    modal.querySelector(".warning-icon").innerText = icon;

    // Update Modal Content
    document.getElementById("alert-city").innerText = cityName;
    document.getElementById("alert-aqi").innerText = aqiLabel;

    // Update body text based on severity
    const bodyText = modal.querySelector(".modal-body p");
    if (!isAlert) {
      bodyText.innerHTML = `The air quality in <strong>${cityName}</strong> is currently <strong>${aqiLabel}</strong>. It's a great time for outdoor activities!`;
      modal.classList.remove("warning-glow");
      modal.classList.add("info-glow");
    } else {
      bodyText.innerHTML = `Warning: The air quality in <strong>${cityName}</strong> is currently <strong>${aqiLabel}</strong>. Please take necessary precautions.`;
      modal.classList.remove("info-glow");
      modal.classList.add("warning-glow");
    }

    modal.style.display = "flex";

    // Only send email for High AQI (threshold >= 3) to avoid spamming the user's inbox
    if (isAlert) {
      sendAlertEmail(cityName, aqiLabel);
    }
  }

  // 📏 Distance Helper (Haversine Formula)
  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Exposed to global for onclick
  window.closeAQIAlert = function () {
    const modal = document.getElementById("aqi-alert-modal");
    if (modal) modal.style.display = "none";
  };

  // 🌍 Check AQI for coordinates
  async function checkLiveAQI(lat, lon, locationLabel) {
    const WEATHER_KEY = typeof CONFIG !== 'undefined' ? CONFIG.WEATHER_API_KEY : "";
    if (!WEATHER_KEY || WEATHER_KEY.includes("YOUR")) return;

    try {
      const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${WEATHER_KEY}&q=${lat},${lon}&aqi=yes`);
      const data = await res.json();

      if (data.current && data.current.air_quality) {
        const epaIndex = data.current.air_quality["us-epa-index"];
        const city = data.location.name;

        // Show notification for ALL levels as requested by the user
        showAQINotification(locationLabel || city, EPA_RISK_LABELS[epaIndex], epaIndex);
      }
    } catch (err) {
      console.error("Live AQI check failed:", err);
    }
  }

  function searchCity() {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) return;

    const city = cities.find(c => c.name.toLowerCase() === query);

    if (city) {
      map.flyTo([city.lat, city.lon], 12, { animate: true, duration: 1.5 });

      L.popup()
        .setLatLng([city.lat, city.lon])
        .setContent(`<div style="text-align: center;"><h3>${city.name}</h3><p>AQI Intensity: ${city.aqi}</p></div>`)
        .openOn(map);

      // Check live data for searching city too
      checkLiveAQI(city.lat, city.lon, city.name);

    } else {
      alert("City not found! Please try a major city.");
    }
  }

  // 🖱️ Event Listeners
  if (searchBtn) searchBtn.addEventListener("click", searchCity);
  if (searchInput) searchInput.addEventListener("keydown", (e) => (e.key === "Enter" && searchCity()));

  // 📍 USER LOCATION DETECTION
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async function (position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      map.setView([lat, lon], 13);
      L.marker([lat, lon]).addTo(map).bindPopup("📍 You are here").openPopup();

      // 1. Trigger Live Alert for user's exact current location
      await checkLiveAQI(lat, lon, "Your Current Location");

      // 2. 🏠 30km Proximity Check: Detect if user is near a major city
      cities.forEach(city => {
        const distance = getDistance(lat, lon, city.lat, city.lon);
        if (distance <= 30) {
          console.log(`🏠 Proximity Detected: within ${distance.toFixed(1)}km of ${city.name}`);
          checkLiveAQI(city.lat, city.lon, `${city.name} (Near You)`);
        }
      });

    }, function () {
      console.warn("Location access denied.");
    });
  }

  // 📈 AQI LINE CHART
  const ctx = document.getElementById('aqiChart').getContext('2d');

  const aqiChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        label: 'Average AQI',
        data: [210, 190, 220, 250, 230, 200, 180], // Sample trained output
        borderColor: '#38bdf8',
        backgroundColor: 'rgba(56, 189, 248, 0.2)',
        tension: 0.4,
        fill: true,
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: "white" } }
      },
      scales: {
        x: { ticks: { color: "white" } },
        y: { ticks: { color: "white" } }
      }
    }
  });

};


// 🤖 AI CHATBOT LOGIC
document.addEventListener("DOMContentLoaded", () => {
  const chatInput = document.querySelector("#chat-input");
  const sendBtn = document.querySelector("#send-btn");
  const chatMessages = document.querySelector("#chat-messages");

  // 🔑 API KEY (From config.js)
  const GEMINI_API_KEY = typeof CONFIG !== 'undefined' ? CONFIG.GEMINI_API_KEY : "";

  function appendMessage(text, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", sender);

    // Create inner content
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("msg-content");
    contentDiv.textContent = text;

    msgDiv.appendChild(contentDiv);
    chatMessages.appendChild(msgDiv);

    // Auto-scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function getMockResponse(input) {
    const lower = input.toLowerCase();
    if (lower.includes("hello") || lower.includes("hi")) return "Hello! I'm your Gemini-powered Assistant. Ask me about AQI or health tips!";
    if (lower.includes("aqi") || lower.includes("pollution")) return "The Air Quality Index (AQI) is a measure of how polluted the air is. High AQI means poor air quality!";
    if (lower.includes("health") || lower.includes("safe")) return "On high AQI days, it's best to wear a mask and limit outdoor activities. Stay safe!";
    return "I am here to help you with AQI and environmental health questions!";
  }

  async function getBotResponse(userMessage) {
    if (!GEMINI_API_KEY || GEMINI_API_KEY.includes("YOUR")) {
      return "I can't connect to the server right now (Missing Gemini API Key). But I can tell you that reducing car usage helps AQI!";
    }

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: userMessage }]
          }]
        })
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.error?.message || "Unknown error";
        if (errorMessage.includes("quota") || errorMessage.includes("limit")) {
          return getMockResponse(userMessage);
        }
        return `⚠️ Gemini API Error: ${errorMessage}`;
      }

      if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts) {
        return data.candidates[0].content.parts[0].text;
      } else {
        return "I'm having trouble processing that thought (Empty response from Gemini).";
      }
    } catch (error) {
      console.error("Chatbot Error:", error);
      return "Sorry, connection to Gemini failed. Please check your internet.";
    }
  }

  async function handleChat() {
    const text = chatInput.value.trim();
    if (!text) return;

    appendMessage(text, "user");
    chatInput.value = "";

    const botReply = await getBotResponse(text);

    appendMessage(botReply, "bot");
  }

  // Event Listeners
  if (sendBtn) {
    sendBtn.addEventListener("click", handleChat);
  }

  if (chatInput) {
    chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleChat();
    });
  }
});






