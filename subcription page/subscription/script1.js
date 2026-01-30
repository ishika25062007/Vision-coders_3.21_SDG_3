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
