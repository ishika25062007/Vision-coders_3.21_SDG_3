window.addEventListener("load", () => {

  const splash = document.getElementById("splash-screen");
  const loginScreen = document.getElementById("login-screen");
  const permissionPopup = document.getElementById("permission-popup");

  const allowBtn = document.getElementById("allow-btn");
  const denyBtn = document.getElementById("deny-btn");

  const loginBtn = document.querySelector(".login-btn");
  const skipBtn = document.querySelector(".skip-btn");

  // 🔹 Show login screen after any key press
  document.addEventListener("keydown", () => {
    if (splash && loginScreen) {
      splash.style.opacity = "0";
      splash.style.visibility = "hidden";

      loginScreen.style.visibility = "visible";
      loginScreen.style.opacity = "1";
    }
  }, { once: true });

  // 🔹 Show permission popup
  function showPermissionPopup() {
    if (permissionPopup) {
      permissionPopup.style.visibility = "visible";
      permissionPopup.style.opacity = "1";
    }
  }

  // LOGIN → ask permission
  if (loginBtn) {
    loginBtn.addEventListener("click", showPermissionPopup);
  }

  // SKIP → still ask permission
  if (skipBtn) {
    skipBtn.addEventListener("click", showPermissionPopup);
  }

  // ALLOW → Request location → go home
  if (allowBtn) {
    allowBtn.addEventListener("click", () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("Location granted:", position.coords);
            window.location.href = "home.html";
          },
          () => {
            alert("Location denied. Redirecting anyway.");
            window.location.href = "home.html";
          }
        );
      } else {
        alert("Geolocation not supported.");
        window.location.href = "home.html";
      }
    });
  }

  // DENY → Close popup → still continue
  if (denyBtn) {
    denyBtn.addEventListener("click", () => {
      if (permissionPopup) {
        permissionPopup.style.opacity = "0";
        permissionPopup.style.visibility = "hidden";
      }

      setTimeout(() => {
        window.location.href = "home.html";
      }, 400);
    });
  }

});
