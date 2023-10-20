// Define an asynchronous event handler for the login form submission
const loginFormHandler = async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the values of email and password input fields from the form
  const email = document.querySelector('#login-username').value.trim();
  const password = document.querySelector('#login-password').value.trim();

  // Check if both email and password are provided
  if (email && password) {
    // Send a POST request to the '/api/login' endpoint with user credentials
    const response = await fetch('/api/login', {
      method: 'POST', // Use the HTTP POST method
      body: JSON.stringify({
        email, // Send the email and password as JSON data
        password,
      }),
      headers: { 'Content-Type': 'application/json' }, // Specify JSON content type
    });

    // Check if the response is successful (status code 200 OK)
    if (response.ok) {
      // If successful, redirect the user to the dashboard page
      document.location.replace('/dashboard');
    } else {
      // If login fails, show an alert indicating a failed login attempt
      alert('Failed to log in');
    }
  }
};

// Add an event listener to the login form's submit event, invoking the loginFormHandler
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
