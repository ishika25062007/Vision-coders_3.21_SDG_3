window.addEventListener("load", () => {

  const splash = document.getElementById("splash-screen");
  const loginScreen = document.getElementById("login-screen");
  const permissionPopup = document.getElementById("permission-popup");

  const allowBtn = document.getElementById("allow-btn");
  const denyBtn = document.getElementById("deny-btn");

  const loginBtn = document.querySelector(".login-btn");
  const signupBtn = document.querySelector(".signup-btn");
  const googleBtn = document.querySelector(".google-btn");
  const skipBtn = document.querySelector(".skip-btn");
  const authMessage = document.getElementById("auth-message");

  function showMessage(msg, type = "error") {
    if (!authMessage) return;
    authMessage.textContent = msg;
    authMessage.style.color = type === "error" ? "#ff8a80" : "#69f0ae"; // Lighter colors for dark bg
    authMessage.style.opacity = "1";
    setTimeout(() => {
      authMessage.style.opacity = "0";
    }, 5000);
  }

  // 🔹 Helper to get inputs
  function getCredentials() {
    const email = document.getElementById("email")?.value;
    const password = document.getElementById("password")?.value;
    return { email, password };
  }

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
      permissionPopup.classList.add("active"); // Use class for animation
    }
  }

  // LOGIN → Authenticate → ask permission
  if (loginBtn) {
    loginBtn.addEventListener("click", async () => {
      const { email, password } = getCredentials();
      if (!email || !password) {
        showMessage("Please enter email and password.");
        return;
      }

      const originalText = loginBtn.textContent;
      loginBtn.textContent = "Logging in...";
      const { data, error } = await signIn(email, password);
      loginBtn.textContent = originalText;

      if (error) {
        showMessage(error.message);
      } else {
        showMessage("Login successful!", "success");
        setTimeout(showPermissionPopup, 800);
      }
    });
  }

  // SIGNUP
  if (signupBtn) {
    signupBtn.addEventListener("click", async () => {
      const { email, password } = getCredentials();
      if (!email || !password) {
        showMessage("Please enter email and password.");
        return;
      }

      const originalText = signupBtn.textContent;
      signupBtn.textContent = "Creating...";
      const { data, error } = await signUp(email, password);
      signupBtn.textContent = originalText;

      if (error) {
        showMessage(error.message);
      } else {
        showMessage("Signup successful! Please confirm your email.", "success");
      }
    });
  }

  // GOOGLE LOGIN
  if (googleBtn) {
    googleBtn.addEventListener("click", async () => {
      const originalHTML = googleBtn.innerHTML;
      googleBtn.textContent = "Redirecting...";
      const { error } = await signInWithGoogle();
      if (error) {
        googleBtn.innerHTML = originalHTML;
        showMessage(error.message);
      }
    });
  }

  // SKIP
  if (skipBtn) {
    skipBtn.addEventListener("click", showPermissionPopup);
  }

  // ALLOW
  if (allowBtn) {
    allowBtn.addEventListener("click", () => {
      // ... (existing geolocation logic) ...
      // Using timeout to simulate processing for now
      alert("Location access granted (simulated). Proceeding...");
      window.location.href = "../home/home.html";
    });
  }

  // DENY
  if (denyBtn) {
    denyBtn.addEventListener("click", () => {
      permissionPopup.classList.remove("active");
      setTimeout(() => {
        window.location.href = "../home/home.html";
      }, 300);
    });
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
