document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:3005/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();

      if (response.ok) {
        alert(responseData.message);
        localStorage.setItem("token", responseData.token);
        window.location.href = "/Html/HomePage.html";
      } else {
        displayErrorMessage(responseData.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
      displayErrorMessage("Login failed. Please try again.");
    }
  });

function displayErrorMessage(message) {
  const errorContainer = document.getElementById("errorContainer");
  errorContainer.textContent = message;
}
