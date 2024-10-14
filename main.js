function getBookList() {
    // get the list from the API
    try {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", "https://openlibrary.org/people/mekBot/books/want-to-read.json", true ); // true for asynchronous request
        // we define the max time to wait for the request to complete: 5 seconds (expressed as milliseconds)
        xmlHttp.timeout = 5000;

        // this is the event handler for when the request is complete
        xmlHttp.onreadystatechange = function () {
            console.log("onreadystatechange is called");
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) { // 4 means the request is done
                const response = JSON.parse(xmlHttp.responseText);
                renderBooks(response);
            } else if (xmlHttp.status === 0) { // a timeout is going to be considered status = 0
                console.log("xmlHttp.status is 0");
                displayError();    
            }    
        }
        // this is the event handler for when errors occur
        xmlHttp.onerror = function () {
            console.log("onerror is called");
            displayError();    
        }    

        //trigger / send the request
        xmlHttp.send( null );
    } catch (error) {
        console.log("catch block is called");
        displayError();
    }
}

// we created this so we do not duplicate these lines in multiple places
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