import React, { Component } from "react";
import Book from "./Book";
import "./BookShelf.css";
import PropTypes from "prop-types";

class BookShelf extends Component {
    render() {
        const { books, shelf, onBookShelfChange } = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <Book
                                key={book.id}
                                id={book.id}
                                book={book}
                                onStatusChange={(book, newShelf) => {
                                    onBookShelfChange(book, newShelf);
                                }}
                            />
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

BookShelf.propTypes = {
    books: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired,
    onBookShelfChange: PropTypes.func.isRequired,
};

export default BookShelf;
