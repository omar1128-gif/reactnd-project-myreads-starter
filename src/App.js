import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import { Link, Route } from "react-router-dom";
import "./App.css";
import BookShelf from "./Components/BookShelf";

const bookShelves = [
    {
        title: "Currently Reading",
        status: "currentlyReading",
    },
    { title: "Want to Read", status: "wantToRead" },
    { title: "Read", status: "read" },
];

class BooksApp extends Component {
    state = {
        books: [],
    };

    componentDidMount() {
        BooksAPI.getAll().then((res) => this.setState({ books: res }));
    }

    render() {
        const { books } = this.state;
        return (
            <div className="app">
                <Route
                    path="/search"
                    render={() => (
                        <div className="search-books">
                            <div className="search-books-bar">
                                <Link to="/" className="close-search">
                                    Close
                                </Link>
                                <div className="search-books-input-wrapper">
                                    <input
                                        type="text"
                                        placeholder="Search by title or author"
                                    />
                                </div>
                            </div>
                            <div className="search-books-results">
                                <ol className="books-grid" />
                            </div>
                        </div>
                    )}
                />
                <Route
                    exact
                    path="/"
                    render={() => (
                        <div className="list-books">
                            <div className="list-books-title">
                                <h1>MyReads</h1>
                            </div>
                            <div className="list-books-content">
                                <div>
                                    {bookShelves.map((shelf) => (
                                        <BookShelf
                                            shelf={shelf.title}
                                            books={books.filter(
                                                (book) =>
                                                    book.shelf === shelf.status
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="open-search">
                                <Link
                                    to="/search"
                                    className="open-search-button"
                                >
                                    Add a book
                                </Link>
                            </div>
                        </div>
                    )}
                />
            </div>
        );
    }
}

export default BooksApp;
