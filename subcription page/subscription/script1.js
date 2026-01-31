/* ================= CITY DATA (MUMBAI DUMMY) ================= */

const cityData = {
  city: "Mumbai",
  pollutants: {
    pm25: 68,
    pm10: 55,
    no2: 40,
    o3: 35,
    so2: 20
  },
  pros: [
    "Coastal wind flow",
    "Improving metro network",
    "Emission monitoring zones"
  ],
  cons: [
    "High traffic density",
    "Construction dust",
    "Humidity traps pollution"
  ],
  health: {
    asthma: "Medium",
    copd: "Moderate",
    bronchitis: "High"
  },
  recommendation:
    "Limit outdoor activity in mornings. Best time: After sunset."
};

/* ================= PROS & CONS ================= */

cityData.pros.forEach(p => {
  const li = document.createElement("li");
  li.textContent = p;
  document.getElementById("prosList").appendChild(li);
});

cityData.cons.forEach(c => {
  const li = document.createElement("li");
  li.textContent = c;
  document.getElementById("consList").appendChild(li);
});

/* ================= HEALTH ================= */

document.getElementById("asthma").innerText = cityData.health.asthma;
document.getElementById("copd").innerText = cityData.health.copd;
document.getElementById("bronchitis").innerText = cityData.health.bronchitis;
document.getElementById("recommendation").innerText =
  cityData.recommendation;

/* ================= RADAR (SPIDER) CHART ================= */

new Chart(document.getElementById("radarChart"), {
  type: "radar",
  data: {
    labels: Object.keys(cityData.pollutants),
    datasets: [
      {
        label: "Pollution Severity",
        data: Object.values(cityData.pollutants),
        backgroundColor: "rgba(37,99,235,0.25)",
        borderColor: "#2563eb",
        pointBackgroundColor: "#2563eb"
      }
    ]
  },
  options: {
    scales: {
      r: {
        angleLines: { color: "#e5e7eb" },
        grid: { color: "#e5e7eb" },
        ticks: { display: false }
      }
    }
  }
});

/* ================= 3D STYLE COLUMN CHART ================= */

new Chart(document.getElementById("columnChart"), {
  type: "bar",
  data: {
    labels: Object.keys(cityData.pollutants),
    datasets: [
      {
        label: "Pollution Level",
        data: Object.values(cityData.pollutants),
        backgroundColor: "rgba(14,165,233,0.8)",
        borderRadius: 8
      }
    ]
  },
  options: {
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        grid: { display: false }
      },
      y: {
        grid: { color: "#e5e7eb" }
      }
    }
  }
});
// 📧 EMAILJS CONFIGURATION
// Keys loaded from config.js
const EMAILJS_SERVICE_ID = typeof CONFIG !== 'undefined' ? CONFIG.EMAILJS_SERVICE_ID : "";
const EMAILJS_TEMPLATE_ID = typeof CONFIG !== 'undefined' ? CONFIG.EMAILJS_TEMPLATE_ID : "";
const EMAILJS_PUBLIC_KEY = typeof CONFIG !== 'undefined' ? CONFIG.EMAILJS_PUBLIC_KEY : "";

// Initialize EmailJS
(function () {
  emailjs.init(EMAILJS_PUBLIC_KEY);
})();

// 💾 Local Storage Key
const DB_KEY = "aeropulse_subscribers";

// MOCK AQI DATA for Admin Check
const CITY_AQI = {
  "Delhi": 250, // High
  "Mumbai": 160, // Moderate-High
  "Kolkata": 180, // High
  "Bangalore": 80 // Safe
};

// 1️⃣ USER: Subscribe Function
function subscribeUser() {
  const email = document.getElementById("userEmail").value;
  const city = document.getElementById("userCity").value;
  const msg = document.getElementById("sub-message");

  if (!email || !email.includes("@") || city === "Select City") {
    msg.style.color = "red";
    msg.innerText = "Please enter a valid email and city.";
    return;
  }

  // Get existing list
  let subscribers = JSON.parse(localStorage.getItem(DB_KEY)) || [];

  // Check duplicate
  if (subscribers.some(s => s.email === email)) {
    msg.style.color = "orange";
    msg.innerText = "You are already subscribed!";
    return;
  }

  // Add new subscriber
  subscribers.push({ email, city, date: new Date().toLocaleDateString() });
  localStorage.setItem(DB_KEY, JSON.stringify(subscribers));

  msg.style.color = "green";
  msg.innerText = "Success! You are subscribed to alerts.";
}

// 2️⃣ ADMIN: Load Subscribers & Alert Logic
function loadSubscribers() {
  const table = document.getElementById("subscriberTable");
  if (!table) return; // Not on admin page

  const subscribers = JSON.parse(localStorage.getItem(DB_KEY)) || [];
  table.innerHTML = "";

  subscribers.forEach(user => {
    const aqi = CITY_AQI[user.city] || 100; // Default if not found
    const isHigh = aqi > 150;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.email}</td>
      <td>${user.city}</td>
      <td>${aqi}</td>
      <td class="${isHigh ? 'high-aqi' : ''}">${isHigh ? '⚠️ High Risk' : '✅ Safe'}</td>
      <td>
        <button class="btn" onclick="sendAlert('${user.email}', '${user.city}', ${aqi})" ${isHigh ? '' : 'disabled'}>
          Send Alert
        </button>
      </td>
    `;
    table.appendChild(row);
  });
}

// 3️⃣ SEND EMAIL (Via EmailJS)
function sendAlert(email, city, aqi) {
  if (confirm(`Send alert to ${email} regarding High AQI in ${city}?`)) {

    const templateParams = {
      to_email: email,
      to_name: "Subscriber",
      city: city,
      aqi_level: aqi,
      message: `Warning: AQI in ${city} has reached ${aqi}. Please wear a mask and stay indoors.`
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(function (response) {
        alert("✅ Email Sent Successfully!");
      }, function (error) {
        alert("❌ Failed to send email. Check API Keys.");
        console.error("EmailJS Error:", error);
      });
  }
}
