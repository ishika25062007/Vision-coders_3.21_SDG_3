const CITIES_DATA = [
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

function navigateTo(page) {
  const routes = {
    home: "home/home.html",
    weather: "weather/weather.html",
    subscriptions: "subscription page/subscriptions.html",
    contact: "../contact/contact.html",
    dashboard: "../dashboard/dashboard.html",

    // ✅ NEW PAGE
    requestApi: "../request-api/request-api.html"
  };

  if (routes[page]) {
    window.location.href = routes[page];
  } else {
    console.error("Route not found:", page);
  }
}
