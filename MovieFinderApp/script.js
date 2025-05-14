const apiKey = "7ccf57b2a9f91542ecb2b78d61cc4a6b";
const searchInput = document.getElementById("searchInput");
const movieResults = document.getElementById("movieResults");

async function searchMovies(query = null) {
  if (!query && searchInput) {
    query = searchInput.value.trim();
  }
  if (!query) return alert("Please enter a movie title.");

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    console.log("Raw response:", response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Search results:", data);

    if (data.results.length === 0) {
      movieResults.innerHTML = `<p>No movies found.</p>`;
      return;
    }

    displayMovies(data.results);
  } catch (error) {
    console.error("Error fetching movies:", error);
    movieResults.innerHTML = `<p>Error loading movies.</p>`;
  }
}

function displayMovies(movies) {
  movieResults.innerHTML = "";

  movies.forEach(movie => {
    const posterUrl = movie.poster_path 
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
      : "https://via.placeholder.com/500x750?text=No+Poster ";

    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
      <img src="${posterUrl}" alt="${movie.title}">
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p><strong>Rating:</strong> ${movie.vote_average || "N/A"}/10</p>
        <p>${movie.overview.substring(0, 120)}...</p>
      </div>
    `;
    movieResults.appendChild(card);
  });
}

// Load popular movies on page load
async function loadPopularMovies() {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=1`;
  console.log("Fetching popular movies from:", url);

  try {
    const response = await fetch(url);
    console.log("Response status:", response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Popular movies data:", data);

    if (data.results.length === 0) {
      movieResults.innerHTML = `<p>No popular movies found.</p>`;
      return;
    }

    displayMovies(data.results);
  } catch (error) {
    console.error("Error loading popular movies:", error);
    movieResults.innerHTML = `<p>Error loading movies. Please try again later.</p>`;
  }
}

// Run on page load
loadPopularMovies();

// Optional test search
setTimeout(() => searchMovies("inception"), 2000);