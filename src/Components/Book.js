import React, { Component } from "react";
import "./Book.css";
import PropTypes from "prop-types";

class Book extends Component {
    render() {
        const { book, id, onStatusChange } = this.props;
        return (
            <li key={id}>
                <div className="book">
                    <div className="book-top">
                        {book.imageLinks !== undefined ? (
                            <div
                                className="book-cover"
                                style={{
                                    width: 128,
                                    height: 192,
                                    backgroundImage: `url(${
                                        book.imageLinks.thumbnail
                                    })`,
                                }}
                            />
                        ) : (
                            <div
                                className="book-cover"
                                style={{
                                    width: 128,
                                    height: 192,
                                    backgroundColor: "white",
                                }}
                            />
                        )}

                        <div className="book-shelf-changer">
                            <select
                                onChange={(event) =>
                                    onStatusChange(book, event.target.value)
                                }
                                value={book.shelf ? book.shelf : "none"}
                            >
                                <option value="move" disabled>
                                    Move to...
                                </option>
                                <option value="currentlyReading">
                                    Currently Reading
                                </option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">
                        {Array.isArray(book.authors) ? (
                            book.authors.map((author) => (
                                <p key={author}>{author}</p>
                            ))
                        ) : (
                            <p>{book.authors}</p>
                        )}
                    </div>
                </div>
            </li>
        );
    }
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    onStatusChange: PropTypes.func.isRequired,
};

export default Book;
