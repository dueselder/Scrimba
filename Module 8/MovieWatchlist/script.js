async function getMovieData() {
    const response = await fetch('http://www.omdbapi.com/?apikey=cd39d31c&t=Avengers');
    const data = await response.json();
    console.log(data);
    return data;
}


// Test case 1: Test if the function returns the correct movie data
getMovieData().then((data) => {
    console.log(data);
    // Add your assertions here to check if the returned data is correct
});

// Test case 2: Test if the function handles errors correctly
// Modify the URL to an invalid one to simulate an error
async function testErrorHandling() {
    try {
        const response = await fetch('http://www.omdbapi.com/?apikey=cd39d31c&t=InvalidMovie');
        const data = await response.json();
        console.log(data);
        // Add your assertions here to check if the error is handled correctly
    } catch (error) {
        console.error(error);
        // Add your assertions here to check if the error is handled correctly
    }
}
testErrorHandling();