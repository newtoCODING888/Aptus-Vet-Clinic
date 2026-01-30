document.addEventListener("DOMContentLoaded", async () => {
  // Load modal HTML once
  const res = await fetch("auth-modal.html");
  const html = await res.text();
  document.body.insertAdjacentHTML("beforeend", html);

  const overlay = document.getElementById("authOverlay");
  const closeBtn = document.getElementById("authClose");

  const tabLogin = document.getElementById("tabLogin");
  const tabSignup = document.getElementById("tabSignup");

  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  const loginMsg = document.getElementById("loginMsg");
  const signMsg = document.getElementById("signMsg");

  const linkCreate = document.getElementById("linkCreate");
  const linkLogin = document.getElementById("linkLogin");

  function showLogin(){
    tabLogin.classList.add("active");
    tabSignup.classList.remove("active");
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
    loginMsg.textContent = "";
    signMsg.textContent = "";
  }

  function showSignup(){
    tabSignup.classList.add("active");
    tabLogin.classList.remove("active");
    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    loginMsg.textContent = "";
    signMsg.textContent = "";
  }

  window.openLogin = function(){
    overlay.classList.add("active");
    showLogin();
  };

  window.openSignup = function(){
    overlay.classList.add("active");
    showSignup();
  };

  function closeAuth(){
    overlay.classList.remove("active");
  }

  closeBtn.addEventListener("click", closeAuth);
  overlay.addEventListener("click", (e) => { if (e.target === overlay) closeAuth(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeAuth(); });

  tabLogin.addEventListener("click", showLogin);
  tabSignup.addEventListener("click", showSignup);
  linkCreate.addEventListener("click", showSignup);
  linkLogin.addEventListener("click", showLogin);

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("signName").value.trim();
    const email = document.getElementById("signEmail").value.trim();
    const pass = document.getElementById("signPass").value.trim();
    const pass2 = document.getElementById("signPass2").value.trim();

    if (!name || !email || !pass || !pass2) {
      signMsg.textContent = "Please fill all fields.";
      return;
    }

    if (pass !== pass2) {
      signMsg.textContent = "Passwords do not match.";
      return;
    }

    let users = JSON.parse(localStorage.getItem("aptusUsers")) || [];
    if (users.find(u => u.email === email)) {
      signMsg.textContent = "Email already exists.";
      return;
    }

    users.push({ name, email, pass });
    localStorage.setItem("aptusUsers", JSON.stringify(users));
    signMsg.textContent = "Account created! Please login.";
    setTimeout(showLogin, 500);
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const pass = document.getElementById("loginPass").value.trim();

    let users = JSON.parse(localStorage.getItem("aptusUsers")) || [];
    const user = users.find(u => u.email === email && u.pass === pass);

    if (!user) {
      loginMsg.textContent = "Invalid login.";
      return;
    }

    localStorage.setItem("aptusCurrentUser", JSON.stringify(user));
    loginMsg.textContent = "Login success!";
    setTimeout(closeAuth, 600);
  });
});
