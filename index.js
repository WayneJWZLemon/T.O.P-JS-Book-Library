let myLibrary = [];

function Book(author, title, numPages, status) {
    this.author = author;
    this.title = title;
    this.numPages = numPages;
    this.status = status;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}
