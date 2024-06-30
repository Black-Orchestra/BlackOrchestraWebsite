// script.js

document.addEventListener('DOMContentLoaded', async function () {

    function fadeOut() {
        document.body.classList.add('fade-out');
    
        // Remove the overlay after fading in
        var overlay = document.querySelector('.overlay');
        overlay.addEventListener('transitionend', function () {
            overlay.remove();
        });
    }
    
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
    
    // Create a temporary container element
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = htmlContent;

    // Extract scripts from the temporary container
    const scripts = tempContainer.querySelectorAll('script');
    
    // Append the HTML content to the target element
    targetElement.innerHTML = tempContainer.innerHTML;

    // Evaluate scripts
    scripts.forEach(script => {
        const newScript = document.createElement('script');
        newScript.innerHTML = script.innerHTML;
        document.head.appendChild(newScript).parentNode.removeChild(newScript);
    });
}

    try {
        await injectHTML("/pages/mainPage.html", document.getElementById("main"));
        fadeOut();

        if (yourPage != "") // 404'd     
            await injectHTML(yourPage, document.getElementById("container"));
        
        document.querySelector('.Title').innerHTML = yourTitle;

    } catch (error) 
    {
        console.error('Error:', error);
    }
});

document.write('<script src="/JS/swiper-bundle.min.js"></script>');