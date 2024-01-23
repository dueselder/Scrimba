async function getMovieData() {
    const response = await fetch('http://www.omdbapi.com/?apikey=cd39d31c&t=Avengers');
    const data = await response.json();
    console.log(data);
    return data;
}

getMovieData();