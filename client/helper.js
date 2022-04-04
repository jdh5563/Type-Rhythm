/* Takes in an error message. Sets the error message up in html, and
   displays it to the user. Will be hidden by other events that could
   end in an error.
*/
const handleError = (message) => {
    document.getElementById('errorMessage').textContent = message;
    document.getElementById('error').classList.remove('hidden');
};

/* Sends post requests to the server using fetch. Will look for various
    entries in the response JSON object, and will handle them appropriately.
*/
const sendPost = async (url, data, handler) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    document.getElementById('error').classList.add('hidden');

    if(result.error) {
        handleError(result.error);
    }

    if(result.redirect) {
        window.location = result.redirect;
    }

    if(handler){
        handler(result);
    }
};

// Sends a post to the given url with the given data.
// If a handler is given, it will be called after the
// request is processed
const sendCarPost = async (url, data, handler) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if(result.redirect) {
        window.location = result.redirect;
    }

    if(handler){
        handler(result);
    }
};

// Hides the error message that is always present on screen
const hideError = () => document.getElementById('error').classList.add('hidden');

module.exports = {
    handleError,
    hideError,
    sendPost,
    sendCarPost,
}