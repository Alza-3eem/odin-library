const myLibrary = [];

/*

function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;

    this.toggleReadStatus = function() {
        this.haveRead = !this.haveRead;
    }
}
    
*/

class Book {
    
    constructor(title, author, pages, haveRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.haveRead = haveRead;
    }

    toggleReadStatus() {
        this.haveRead = !this.haveRead;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function showLibrary() {
    const libraryContainer = document.getElementById('library-container');
    libraryContainer.innerHTML = '';

    myLibrary.forEach((book, index) => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');

        bookDiv.innerHTML = `
            <h2>${book.title}</h2>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Read: ${book.haveRead ? 'Yes' : 'No'}</p>
            <button class="toggle-read" data-index="${index}">Toggle "Read"</button>
            <button class="remove-btn" data-index="${index}">Remove</button>
        `;

        libraryContainer.appendChild(bookDiv);
    });

    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            removeBook(parseInt(index, 10));
            showLibrary();
        });
    });

    const readToggleButtons = document.querySelectorAll(".toggle-read");
    readToggleButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            myLibrary[index].toggleReadStatus();
            showLibrary();
        })
    })
}

function submitBook(event) {
    event.preventDefault();

    const newBook = new Book(
        titleInput.value,
        authorInput.value,
        pagesInput.value,
        readInput.value.toLowerCase() === 'yes'
    );

    addBookToLibrary(newBook);

    showLibrary();

    bookForm.reset();
    bookForm.classList.remove("new-form-show");
}

function removeBook(index) {
    myLibrary.splice(index, 1);
}

const newBookBtn = document.querySelector(".new-book")
const bookForm = document.querySelector(".new-form");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("have-read");

bookForm.addEventListener("submit", submitBook);

newBookBtn.addEventListener("click", () => {
    bookForm.classList.toggle("new-form-show");
})

showLibrary();
