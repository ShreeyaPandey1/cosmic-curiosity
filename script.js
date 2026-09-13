const factBox = document.getElementById("fact");
const getFactBtn = document.getElementById("getFact");

// NASA provides DEMO_KEY for public experimentation.
// Do not put private API keys in frontend JavaScript.
const apiKey = "DEMO_KEY";

// Generate a random date between NASA APOD's first available date and today.
function getRandomDate() {
  const start = new Date(1995, 5, 16);
  const end = new Date();

  const randomTime =
    start.getTime() +
    Math.random() * (end.getTime() - start.getTime());

  return new Date(randomTime).toISOString().split("T")[0];
}

// Create a short version of NASA's explanation.
function shortenExplanation(explanation) {
  const sentences = explanation
    .split(". ")
    .filter(Boolean)
    .slice(0, 2);

  return sentences.join(". ") + (sentences.length ? "." : "");
}

// Display an image-based APOD.
function displayImage(data) {
  const title = document.createElement("h2");
  title.textContent = data.title;

  const image = document.createElement("img");
  image.src = data.url;
  image.alt = data.title;
  image.loading = "lazy";

  const explanation = document.createElement("p");
  explanation.className = "explanation";
  explanation.textContent = shortenExplanation(data.explanation);

  const date = document.createElement("p");
  date.className = "fact-date";
  date.textContent = `📅 ${data.date}`;

  factBox.replaceChildren(
    title,
    image,
    explanation,
    date
  );
}

// Display a video-based APOD.
function displayVideo(data) {
  const title = document.createElement("h2");
  title.textContent = data.title;

  const videoLink = document.createElement("a");
  videoLink.className = "video-link";
  videoLink.href = data.url;
  videoLink.target = "_blank";
  videoLink.rel = "noopener noreferrer";
  videoLink.textContent = "📺 Watch Astronomy Video";

  const explanation = document.createElement("p");
  explanation.className = "explanation";
  explanation.textContent = shortenExplanation(data.explanation);

  const date = document.createElement("p");
  date.className = "fact-date";
  date.textContent = `📅 ${data.date}`;

  factBox.replaceChildren(
    title,
    videoLink,
    explanation,
    date
  );
}

// Fetch a random NASA Astronomy Picture of the Day.
async function getAstronomyPicture() {
  const randomDate = getRandomDate();

  const url =
    `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${randomDate}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`NASA API returned ${response.status}`);
  }

  return response.json();
}

// Button click
getFactBtn.addEventListener("click", async () => {
  getFactBtn.disabled = true;
  getFactBtn.textContent = "🔭 Looking into space...";
  
  factBox.innerHTML = `
    <p>Searching the universe...</p>
  `;

  try {
    const data = await getAstronomyPicture();

    if (data.media_type === "image") {
      displayImage(data);
    } else if (data.media_type === "video") {
      displayVideo(data);
    } else {
      throw new Error("Unsupported media type.");
    }
  } catch (error) {
    console.error("NASA API error:", error);

    factBox.innerHTML = `
      <p>
        Houston, we have a problem fetching today's cosmic discovery. 🚨
      </p>
      <p class="fact-date">
        Please try again in a moment.
      </p>
    `;
  } finally {
    getFactBtn.disabled = false;
    getFactBtn.textContent = "🚀 Discover";
  }
});Z