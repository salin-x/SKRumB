// scripts.js

document.addEventListener('DOMContentLoaded', function () {
  // Function to handle login button click
  function handleLoginButtonClick(event) {
      // Prevent default form submission behavior
      event.preventDefault();

      // Redirect to the desired page (e.g., index.html)
      window.location.href = 'index.html';
  }

  // Add event listener to the login button
  const loginButton = document.querySelector('.log-in button');
  loginButton.addEventListener('click', handleLoginButtonClick);
});
