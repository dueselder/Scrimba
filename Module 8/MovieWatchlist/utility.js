const messageBox = document.getElementById('message-box');
const messageContent = document.getElementById('message-content');

export function showMessage(title, method) {
    messageBox.classList.remove('hidden');
    messageBox.classList.add('visible');

    if(method === 'add') {
        // Check if the movie is already in the watchlist
        const watchlist = localStorage.getItem('watchlist') ? JSON.parse(localStorage.getItem('watchlist')) : [];
        if (watchlist.some(movie => movie.Title === title)) {
            messageContent.innerHTML = `<strong>${title}</strong> is already in your watchlist!`;
        } else {
            messageContent.innerHTML = `<strong>${title}</strong> has been added to your watchlist!`;
        }
    } else if (method === 'remove') {
        messageContent.innerHTML = `<strong>${title}</strong> has been removed from your watchlist!`;
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