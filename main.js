function getBookList() {
    // get the list from the API
    // Call `fetch()`, passing in the URL.
    fetch("https://openlibrary.org/people/mekBot/books/want-to-read.json", { signal: AbortSignal.timeout(5000) }).then((response) => {
        // Our handler throws an error if the request did not succeed.
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        renderBooks(response.json);
    }).catch((error) => {
        console.log("catch block was called");
        displayError();   
    });
}

function displayError() {
    const errorMsgDiv = document.createElement("div");
    errorMsgDiv.innerHTML = "<h3>Could not load the list of books!</h3>";
    document.body.appendChild(errorMsgDiv);
}

function renderBooks(responseJson) {    
    const listOfBooks = responseJson.reading_log_entries;

    console.log(listOfBooks);

    // go over the result and put it into the page
    // (create html elements for each book)
    // we could add the elements to the body of the HTML
    const bookNodes = [];
    for(let i = 0; i < listOfBooks.length; i++) {
        const bookDivContent = "<h1>"+listOfBooks[i].work.title+"</h1>";
        const bookDiv = document.createElement("div");
        bookDiv.innerHTML = bookDivContent;

        bookNodes.push(bookDiv);

        document.body.appendChild(bookDiv);
    }
}