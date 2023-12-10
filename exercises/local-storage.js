/**
 * LOCAL STORAGE AND DOM MANIPULATION
 * In this task you will write some functions to let the browser save
 * some of your actions results and retrieve them when the page is reloaded.
 * You will be working with the localStorage.
 * Make sure to read the following exercise-info file/files before you start
 * * 03 LocalStorage.md
 * * 04 EventDelegation.md
 * Local Storage might be shortened to "LS" in the comments beneath.
 * @requirement
 * Event delegation MUST be used
 */

/**
 * @task
 * Implement the 'click' event that solves several tasks by the item click:
 * * If the item is NOT in favorites LS and has white background color
 * * * Changes the color of the box to red
 * * * Add the item's id to the local storage
 * * Else if the box is in favorites LS and has white red color
 * * * Changes the color of the box to white
 * * * Add the item's id to the local storage
 * * Make all the items that are listed in the favorites LS save the red background color when the page is reloaded
 */

/**
 * @hint
 * Here is a plan of how you can structure your code. You can follow it or choose your own way to go
 * * Select the container that holds all the items
 * * Create a function that sets the background to be red for the item with an id listed in favorites LS
 * * Run this function
 * * Create a function that adds an id to favorites LS by id passed as an argument
 * * Create a function that deletes an id from favorites LS by id passed as an argument
 * * Create a callback function that updates the element background color and does the
 * * /~/ action with the item's id depending on if it is in LS or not. The function should
 * * /~/ do that to a specific item that has a specific class value
 * * add the event listener to the container, pass the callback.
 */

// Your code goes here...
// This code assumes there are elements with the IDs 'main-collection' and 'favorites-collection'
// which represent the two sections.

// Wait for the DOM to load

// Function to get the list of favorite IDs from local storage
function getFavoritesFromLocalStorage() {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
}

// Function to save the list of favorite IDs to local storage
function saveFavoritesToLocalStorage(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Function to add an ID to the list of favorites in local storage
function addToFavorites(id) {
    const favorites = getFavoritesFromLocalStorage();
    favorites.push(id);
    saveFavoritesToLocalStorage(favorites);
}

// Function to remove an ID from the list of favorites in local storage
function removeFromFavorites(id) {
    let favorites = getFavoritesFromLocalStorage();
    favorites = favorites.filter(favId => favId !== id);
    saveFavoritesToLocalStorage(favorites);
}

// Function to update the card's background color based on its favorite status
function updateCardColor(card, isFavorite) {
    card.style.backgroundColor = isFavorite ? 'red' : 'white';
}

// Event handler for when a card is clicked
function handleCardClick(event) {
    const card = event.target;
    const id = card.id;
    const isFavorite = getFavoritesFromLocalStorage().includes(id);
    
    if (isFavorite) {
        removeFromFavorites(id);
        updateCardColor(card, false);
    } else {
        addToFavorites(id);
        updateCardColor(card, true);
    }
}

// Add event listener to each card
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', handleCardClick);
});

// Set the initial colors of the cards on page load
document.addEventListener('DOMContentLoaded', () => {
    const favorites = getFavoritesFromLocalStorage();
    document.querySelectorAll('.card').forEach(card => {
        const isFavorite = favorites.includes(card.id);
        updateCardColor(card, isFavorite);
    });
});
