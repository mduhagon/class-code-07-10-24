function getBookList() {
    // get the list from the API
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://openlibrary.org/people/mekBot/books/want-to-read.json", false ); // false for synchronous request
    // because this is a sync request, this line will only be 'done' after the response from 
    // the API server is finished / came back, and a response is already available.
    xmlHttp.send( null ); 

    const response = JSON.parse(xmlHttp.responseText);
    const listOfBooks = response.reading_log_entries;

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

    // remove the first 3 books
    
    

}