// script.js

function fadeOut() {
    document.body.classList.add('fade-out');

    // Remove the overlay after fading in
    var overlay = document.querySelector('.overlay');
    overlay.addEventListener('transitionend', function () {
        overlay.remove();
    });
}

document.addEventListener('DOMContentLoaded', async function () {

    // Function to fetch HTML content from a URL
    async function fetchHTML(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching HTML from ${url}: ${response.statusText}`);
        }
        return response.text();
    }

    // Function to inject HTML into a target element
    async function injectHTML(url, targetElement) {
        const htmlContent = await fetchHTML(url);
        targetElement.innerHTML = htmlContent;
    }

    try {
        await injectHTML("pages/mainPage.html", document.getElementById("main"));
        fadeOut();

        // Delay if needed, or continue with other operations

        await injectHTML(yourPage, document.getElementById("container"));
        document.querySelector('.Title').innerHTML = yourTitle;

    } catch (error) {
        console.error('Error:', error);
    }
});
