const searchBtn = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const movieList = document.getElementById('movie-list');
async function getMovieData() {
    console.log(searchInput.value, "searchInput.value from getMovieData()")
    const response = await fetch(`http://www.omdbapi.com/?apikey=cd39d31c&s=${searchInput.value}`);
    const data = await response.json();
    const movieData = await Promise.all(data.Search.map(movie => getMovieDetailData(movie.imdbID)));
    console.log(movieData, "movieData from getMovieData()")
    return movieData;
}

async function getMovieDetailData(id) {
    const movieDetailResponse = await fetch(`http://www.omdbapi.com/?apikey=cd39d31c&i=${id}&plot=short`);
    const movieDetailData = await movieDetailResponse.json();
    return movieDetailData;
}

async function renderMovieData() {
    const movieData = await getMovieData();
    movieData.forEach(movie => {
        movieList.innerHTML += `
        <div class="card">
            <img src="${movie.Poster}" class="card-img-top" alt="...">
            <h5 class="card-title">${movie.Title}</h5> <span class="card-year">Rating:${movie.imdbRating}</span>
            <p class="card-runtime">${movie.Runtime}</p>
            <p class="card-genre">${movie.Genre}</p>
            <a href="#" class="card-add-watchlist">Add to Watchlist</a>
            <p class="card-plot">${movie.Plot}</p>
        </div>
        `
    })
}


function handleSearchClick() {
    movieList.innerHTML = '';
    renderMovieData();
    searchInput.value = '';
}

searchBtn.addEventListener('click', handleSearchClick);







/*
{
  Title: 'The Avengers',
  Year: '2012',
  Rated: 'PG-13',
  Released: '04 May 2012',
  Runtime: '143 min',
  Genre: 'Action, Sci-Fi',
  Director: 'Joss Whedon',
  Writer: 'Joss Whedon, Zak Penn',
  Actors: 'Robert Downey Jr., Chris Evans, Scarlett Johansson',
  Plot: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
  Language: 'English, Russian',
  Country: 'United States',
  Awards: 'Nominated for 1 Oscar. 38 wins & 81 nominations total',
  Poster: 'https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg',
  Ratings: [
    { Source: 'Internet Movie Database', Value: '8.0/10' },
    { Source: 'Rotten Tomatoes', Value: '91%' },
    { Source: 'Metacritic', Value: '69/100' }
  ],
  Metascore: '69',
  imdbRating: '8.0',
  imdbVotes: '1,445,496',
  imdbID: 'tt0848228',
  Type: 'movie',
  DVD: '22 Jun 2014',
  BoxOffice: '$623,357,910',
  Production: 'N/A',
  Website: 'N/A',
  Response: 'True'
}
*/