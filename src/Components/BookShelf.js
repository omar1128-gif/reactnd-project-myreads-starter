import React, { Component } from "react";
import Book from "./Book";

class BookShelf extends Component {
    render() {
        const { books, shelf } = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <Book key={book.id} book={book} />
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default BookShelf;
