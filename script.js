const myLibrary = [];

function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
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
            <button class="remove-btn" data-index="${index}">Remove</button>
        `;

        libraryContainer.appendChild(bookDiv);
    });

    // Add event listeners to remove buttons
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            removeBook(parseInt(index, 10));
            showLibrary(); // Refresh the library display after removing
        });
    });
}

function submitBook(event) {
    event.preventDefault();

    const newBook = new Book(
        titleInput.value,
        authorInput.value,
        pagesInput.value,
        readInput.value.toLowerCase() === 'yes' // Convert input to boolean
    );

    addBookToLibrary(newBook);

    showLibrary();

    bookForm.reset();
}

function removeBook(index) {
    myLibrary.splice(index, 1); // Remove the book at the specified index
}

// Setup form submission event listener
const bookForm = document.querySelector(".new-form");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("have-read");

bookForm.addEventListener("submit", submitBook);

// Initial display of library
showLibrary();
