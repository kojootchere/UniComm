// Define an asynchronous function for logging out
const logout = async () => {
  // Send a POST request to the '/api/logout' endpoint to log the user out
  const response = await fetch('/api/logout', {
    method: 'POST', // Use the HTTP POST method
    headers: { 'Content-Type': 'application/json' }, // Specify JSON content type
  });

  // Check if the response is successful (status code 200 OK)
  if (response.ok) {
    // If successful, redirect the user to the login page
    document.location.replace('/login');
  } else {
    // If logout fails, show an alert with the status text from the response
    alert(response.statusText);
  }
};

// Add an event listener to the element with the ID 'logout' for click events, invoking the logout function
document.querySelector('#logout').addEventListener('click', logout);
