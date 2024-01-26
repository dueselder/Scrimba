const searchBtn = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const movieList = document.getElementById('movie-list');
const messageBox = document.getElementById('message-box');
const closeMessageBtn = document.getElementById('close-message-btn');

document.addEventListener('click', (e) => {
    if (e.target.dataset.add) {
        e.preventDefault();
        console.log(e.target.dataset.add)
        showMessage(e.target.dataset.name, 'add');
    } else if (e.target.dataset.remove) {
        console.log(e.target.dataset.remove)
    }
});

searchInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        handleSearchClick();
    }
});

function showMessage(title, method) {
    messageBox.classList.remove('hidden');
    messageBox.classList.add('visible');

    if(method === 'add') {
        document.getElementById('message-content').innerHTML = `<strong>${title}</strong> has been added to your watchlist!`;
    } else if (method === 'remove') {
        document.getElementById('message-content').innerHTML = `<strong>${title}</strong> has been removed from your watchlist!`;
    }

    messageBox.style.display = 'flex';

    // hiding the message box with fade-out animation
    setTimeout(() => {
        messageBox.style.opacity = '0';
        setTimeout(() => {
            messageBox.style.display = 'none';
            messageBox.style.opacity = '1';
        }, 500);
    }, 1500);
}


// Fetch functions
async function getMovieData() {
    console.log(searchInput.value, "searchInput.value from getMovieData()")
    const response = await fetch(`http://www.omdbapi.com/?apikey=cd39d31c&s=${searchInput.value}&type=movie`);
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
    movieList.innerHTML = '<p>Loading...</p>';
    const movieData = await getMovieData();
    movieList.innerHTML = '';
    movieData.forEach(movie => {
        movieList.innerHTML += `
        <div class="card">
            <img src="${movie.Poster}" class="card-img-top" alt="...">
            <h5 class="card-title">${movie.Title} 
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12" fill="none">
                <path d="M5.78671 1.19529C6.01122 0.504306 6.98878 0.504305 7.21329 1.19529L8.01547 3.66413C8.11588 3.97315 8.40384 4.18237 8.72876 4.18237H11.3247C12.0512 4.18237 12.3533 5.11208 11.7655 5.53913L9.66537 7.06497C9.40251 7.25595 9.29251 7.59447 9.39292 7.90349L10.1951 10.3723C10.4196 11.0633 9.62875 11.6379 9.04097 11.2109L6.94084 9.68503C6.67797 9.49405 6.32203 9.49405 6.05916 9.68503L3.95903 11.2109C3.37125 11.6379 2.58039 11.0633 2.8049 10.3723L3.60708 7.90349C3.70749 7.59448 3.59749 7.25595 3.33463 7.06497L1.2345 5.53914C0.646715 5.11208 0.948796 4.18237 1.67534 4.18237H4.27124C4.59616 4.18237 4.88412 3.97315 4.98453 3.66414L5.78671 1.19529Z" fill="#FEC654"/>
                </svg>
                <span class="card-rating">${movie.imdbRating}</span>
            </h5> 
            <p class="card-runtime">${movie.Runtime}</p>
            <p class="card-genre">${movie.Genre}</p>
            <a href="#" class="card-add-watchlist" data-add="${movie.imdbID}" data-name="${movie.Title}">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" style="pointer-events: none;">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM9 5C9 4.44772 8.55228 4 8 4C7.44772 4 7 4.44772 7 5V7H5C4.44772 7 4 7.44771 4 8C4 8.55228 4.44772 9 5 9H7V11C7 11.5523 7.44772 12 8 12C8.55228 12 9 11.5523 9 11V9H11C11.5523 9 12 8.55228 12 8C12 7.44772 11.5523 7 11 7H9V5Z" fill="white"/>
                </svg>
                Add to Watchlist
            </a>
            <p class="card-plot">${movie.Plot}</p>
        </div>
        `;
    })
}


function handleSearchClick() {
    
    renderMovieData();
    searchInput.value = '';
}

searchBtn.addEventListener('click', handleSearchClick);
closeMessageBtn.addEventListener('click', () => {
    document.getElementById('message-box').style.display = 'none';
});







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