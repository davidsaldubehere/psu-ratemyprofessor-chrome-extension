// Wait 5 seconds for the page to load
setTimeout(function () {
  // Find all links that include mailto: in the href
  var links = document.querySelectorAll("a[href*='mailto:']");

  // Iterate through each link
  links.forEach(function (link) {
    // Extract email address from the link
    var email = link.href.replace("mailto:", "");

    // Create a button element
    var button = document.createElement("button");
    button.textContent = "Info";
    button.className = "info-button";

    // Create a popup div
    var popup = document.createElement("div");
    popup.className = "professor-info-popup";

    // Add click event listener to the button
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      if (popup.style.display === "none") {
        fetchProfessorInfo(email, popup);
        popup.style.display = "block";
        popup.style.left = event.pageX + "px";
        popup.style.top = event.pageY + "px";
      } else {
        popup.style.display = "none";
      }
    });

    // Close popup when clicking outside
    document.addEventListener("click", function () {
      popup.style.display = "none";
    });

    // Insert the button and popup after the link
    link.parentNode.insertBefore(button, link.nextSibling);
    document.body.appendChild(popup);
  });
}, 5000);

// Function to fetch professor info from API
function fetchProfessorInfo(email, popup) {
  // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
  fetch(`YOUR_API_ENDPOINT?email=${email}`)
    .then((response) => response.json())
    .then((data) => {
      // Update popup content with professor's info
      popup.innerHTML = `
        <h3>${data.name}</h3>
        <p>Department: ${data.department}</p>
        <p>Office: ${data.office}</p>
        <p>Phone: ${data.phone}</p>
        <!-- Add more fields as needed -->
      `;
    })
    .catch((error) => {
      console.error("Error fetching professor info:", error);
      popup.innerHTML = "<p>Error fetching information</p>";
    });
}
function injectCSS(file) {
  const link = document.createElement("link");
  link.href = chrome.runtime.getURL(file);
  link.type = "text/css";
  link.rel = "stylesheet";
  document.head.appendChild(link);
}

injectCSS("styles.css");
