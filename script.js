const factBox = document.getElementById("fact");
const getFactBtn = document.getElementById("getFact");

const apiKey = "8MfBWhbto6Et68kCWB2YthOJcoLhnDroTc9KRC8a"; // your key

// Generate random date between 1995-06-16 and today
function getRandomDate() {
  const start = new Date(1995, 5, 16); 
  const end = new Date();
  const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return new Date(randomTime).toISOString().split("T")[0];
}

getFactBtn.addEventListener("click", async () => {
  factBox.textContent = "Fetching a cosmic mystery...";

  try {
    const randomDate = getRandomDate();
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${randomDate}`;

    const response = await fetch(url);
    const data = await response.json();

    // Shorten explanation to 1–2 sentences max
    let shortFact = data.explanation.split(". ").slice(0, 2).join(". ") + ".";

    // If it's an image
    if (data.media_type === "image") {
      factBox.innerHTML = `
        <h2>${data.title}</h2>
        <img src="${data.url}" alt="NASA Astronomy Image" style="max-width: 100%; border-radius: 10px; margin-top: 1rem;">
        <p style="margin-top: 1rem;">${shortFact}</p>
      `;
    } 
    // If it's a video
    else if (data.media_type === "video") {
      factBox.innerHTML = `
        <h2>${data.title}</h2>
        <a href="${data.url}" target="_blank"><button>📺 Watch Video<button></a>
        <p style="margin-top: 1rem;">${shortFact}</p>
      `;
    }

  } catch (error) {
    factBox.textContent = "Houston, we have a problem fetching data! 🚨";
    console.error("NASA API error:", error);
  }
});
