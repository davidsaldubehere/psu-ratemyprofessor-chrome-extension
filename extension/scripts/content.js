function inject() {
  // Find all links that include mailto: in the href
  var links = document.querySelectorAll("a[href*='mailto:']");

  // Iterate through each link
  links.forEach(function (link) {
    // Extract email address from the link
    var name = link.textContent;

    // Create a button element
    var button = document.createElement("button");
    button.textContent = "Ratings";
    button.className = "info-button";

    // Create a popup div
    var popup = document.createElement("div");
    popup.style.display = "none";
    popup.className = "professor-info-popup";

    // Add click event listener to the button
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      if (popup.style.display === "none") {
        fetchProfessorInfo(name, popup);
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
}
// Function to fetch professor info from API
async function fetchProfessorInfo(name, popup) {
  // Make request to http://127.0.0.1:5000 with json name = name

  var response = await fetch(
    "https://bot-psuwebdevclub.pythonanywhere.com/getprofid",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    }
  );
  response = await response.json();
  popup.innerHTML = `<iframe src="https://www.ratemyprofessors.com/professor/${response.profid}"></iframe>`;
}
function injectCSS(file) {
  const link = document.createElement("link");
  link.href = chrome.runtime.getURL(file);
  link.type = "text/css";
  link.rel = "stylesheet";
  document.head.appendChild(link);
}

injectCSS("styles.css");

const mo = new MutationObserver(onMutation);
observe();

function observe() {
  mo.observe(document.querySelector("main"), {
    childList: true,
    subtree: true,
  });
}

function onMutation() {
  mo.disconnect();
  inject();

  observe();
}
