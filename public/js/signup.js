// Define an asynchronous event handler for the signup form submission
const signupFormHandler = async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get the values of email, password, and username input fields from the form
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const username = document.querySelector('#username-signup').value.trim();

  // Check if the password length is less than 8 characters and show an alert if it is
  if (password.length < 8) {
    alert('Password must be more than 8 characters.');
  }

  // Check if email, password, and username are provided
  if (email && password && username) {
    // Send a POST request to the '/api/signup' endpoint with user credentials
    const response = await fetch('/api/signup', {
      method: 'POST', // Use the HTTP POST method
      body: JSON.stringify({
        email, // Send the email, password, and username as JSON data
        password,
        username,
      }),
      headers: { 'Content-Type': 'application/json' }, // Specify JSON content type
    });

    // Check if the response is successful (status code 200 OK)
    if (response.ok) {
      // If successful, redirect the user to the homepage
      document.location.replace('/');
    } else {
      // If signup fails, show an alert indicating a failed signup attempt
      alert('Failed to sign up');
    }
  }
};

// Add an event listener to the signup form's submit event, invoking the signupFormHandler
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
