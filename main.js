let bookReadStatus = {};

let savedReadStatus = localStorage.getItem("bookReadStatus");
if (savedReadStatus) {
    console.log("We found bookReadStatus");
    bookReadStatus = JSON.parse(savedReadStatus);
    console.log(bookReadStatus);
}

function getBookList() {
    // get the list from the API
    // Call `fetch()`, passing in the URL.
    fetch("local-list.json", { signal: AbortSignal.timeout(5000) }).then(async (response) => {
        // Our handler throws an error if the request did not succeed.
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        console.log("We can render some books");
        const responsJson = await response.json();
        renderBooks(responsJson);
    }).catch((error) => {
        console.log("catch block was called", error);
        displayError();   
    });
}

function displayError() {
    const errorMsgDiv = document.createElement("div");
    errorMsgDiv.innerHTML = "<h3>Could not load the list of books!</h3>";
    document.body.appendChild(errorMsgDiv);
}

function renderBooks(responseJson) {    
    console.log(responseJson);

    const listOfBooks = responseJson.reading_log_entries;

    console.log(listOfBooks);

    // go over the result and put it into the page
    // (create html elements for each book)
    // we could add the elements to the body of the HTML
    for(let i = 0; i < listOfBooks.length; i++) {
        const bookDivContent = "<h1>"+listOfBooks[i].work.title+"</h1>";
        const bookUniqueKey = listOfBooks[i].work.key;
        const bookDiv = document.createElement("div");
        bookDiv.innerHTML = bookDivContent;

        const buttonElement = document.createElement("button");
        buttonElement.id = bookUniqueKey;
        buttonElement.addEventListener("click", (e) => {
            if (bookReadStatus[e.currentTarget.id]) {
                e.currentTarget.innerHTML = "Not Read";
                bookReadStatus[e.currentTarget.id] = false;
            } else {
                e.currentTarget.innerHTML = "Read";
                bookReadStatus[e.currentTarget.id] = true;
            }
            localStorage.setItem("bookReadStatus", JSON.stringify(bookReadStatus));
        }); 
        bookDiv.appendChild(buttonElement);

        // initially the book is not read    
        if (bookReadStatus[bookUniqueKey]) {
             buttonElement.innerHTML = "Read";
            bookReadStatus[bookUniqueKey] = true;
        } else {
            buttonElement.innerHTML = "Not Read";
            bookReadStatus[bookUniqueKey] = false;
        }
        
        document.body.appendChild(bookDiv);
    }
}