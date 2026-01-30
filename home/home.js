window.onload = function () {

  // 🌍 Create the map (default view before location loads)
  var map = L.map('cesiumContainer').setView([20.5937, 78.9629], 5);

  // 🗺️ OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // 🌡️ AQI Heatmap layer (intensity = pollution level 0–1)
  var aqiData = [
    [28.6139, 77.2090, 0.9],  // Delhi - Very High
    [19.0760, 72.8777, 0.7],  // Mumbai
    [22.5726, 88.3639, 0.6],  // Kolkata
    [13.0827, 80.2707, 0.5],  // Chennai
    [12.9716, 77.5946, 0.4],  // Bangalore
    [17.3850, 78.4867, 0.65], // Hyderabad
    [26.9124, 75.7873, 0.55]  // Jaipur
  ];
  if (typeof L !== 'undefined' && L.heatLayer) {
    L.heatLayer(aqiData, {
      radius: 40,
      blur: 18,
      maxZoom: 17,
      max: 1,
      minOpacity: 0.3,
      gradient: { 0.25: 'blue', 0.45: 'lime', 0.65: 'yellow', 0.85: 'orange', 1: 'red' }
    }).addTo(map);
  }

  // 📍 USER LOCATION DETECTION
  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function(position) {

      var lat = position.coords.latitude;
      var lon = position.coords.longitude;

      // Zoom map to user's location
      map.setView([lat, lon], 13);

      // Add marker
      L.marker([lat, lon]).addTo(map)
        .bindPopup("📍 You are here")
        .openPopup();

    }, function() {
      alert("Location access denied. Showing default map view.");
    });

  } else {
    alert("Geolocation is not supported by your browser.");
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


document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("chatbot-btn");
  const box = document.getElementById("chatbot-box");
  const close = document.getElementById("chatbot-close");
  const input = document.getElementById("chatbot-input");
  const messages = document.getElementById("chatbot-messages");

  btn.onclick = () => {
    box.style.display = "flex";
    input.focus(); // 🔑 FORCE keyboard focus
  };

  close.onclick = () => {
    box.style.display = "none";
  };

  input.addEventListener("keydown", (e) => {
    e.stopPropagation(); // 🔥 stop map stealing keyboard
    if (e.key === "Enter" && input.value.trim() !== "") {

      const user = document.createElement("div");
      user.className = "user";
      user.textContent = input.value;
      messages.appendChild(user);

      const bot = document.createElement("div");
      bot.className = "bot";
      bot.textContent = "Analyzing AQI request…";

      setTimeout(() => {
        messages.appendChild(bot);
        messages.scrollTop = messages.scrollHeight;
      }, 500);

      input.value = "";
    }
  });

});






