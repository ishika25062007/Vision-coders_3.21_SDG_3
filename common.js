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
