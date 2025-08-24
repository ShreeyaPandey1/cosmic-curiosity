const factBox = document.getElementById("fact");
const getFactBtn = document.getElementById("getFact");

const apiKey = "BJXlvBpmTCTxl3W8895Pvopy4FFhbQ9hB1ELXXOY"; // Replace with your own key if you have one
const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

getFactBtn.addEventListener("click", async () => {
  factBox.textContent = "Fetching a cosmic mystery...";

  try {
    const response = await fetch(url);
    const data = await response.json();

    // If it's an image, show it with the fact
    factBox.innerHTML = `
      <h2>${data.title}</h2>
      <img src="${data.url}" alt="NASA Astronomy Image" style="max-width: 100%; border-radius: 10px; margin-top: 1rem;">
      <p style="margin-top: 1rem;">${data.explanation}</p>
    `;
  } catch (error) {
    factBox.textContent = "Houston, we have a problem fetching data! 🚨";
    console.error("NASA API error:", error);
  }
});
