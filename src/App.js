import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import { Link, Route } from "react-router-dom";
import "./App.css";
import BookShelf from "./Components/BookShelf";
import BookSearch from "./Components/BookSearch";

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

    async componentDidMount() {
        try {
            const res = await BooksAPI.getAll();
            this.setState({ books: res });
        } catch (e) {
            console.log(e);
        }
    }

    updateBookShelf = async (book, shelf) => {
        try {
            await BooksAPI.update(book, shelf);
            const res = await BooksAPI.getAll();
            this.setState({ books: res });
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        const { books } = this.state;
        return (
            <div className="app">
                <Route
                    path="/search"
                    render={() => (
                        <BookSearch
                            booksOnShelf={books}
                            onBookShelfChange={this.updateBookShelf}
                        />
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
                                            key={shelf.status}
                                            shelf={shelf.title}
                                            books={books.filter(
                                                (book) =>
                                                    book.shelf === shelf.status
                                            )}
                                            onBookShelfChange={(book, shelf) =>
                                                this.updateBookShelf(
                                                    book,
                                                    shelf
                                                )
                                            }
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
