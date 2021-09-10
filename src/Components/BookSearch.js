import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import "./BookSearch.css";
import * as BooksAPI from "../BooksAPI";

class BookSearch extends Component {
    state = {
        searchResult: [],
    };

    handleOnChangeSearch = async (query) => {
        try {
            if (query) {
                const res = await BooksAPI.search(query);
                if (Array.isArray(res)) {
                    this.setState({ searchResult: res });
                }
            } else {
                this.setState(() => ({
                    searchResult: [],
                }));
            }
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        const { searchResult } = this.state;
        const { booksOnShelf, onBookShelfChange } = this.props;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            // onKeyPress={(event) => {
                            //     if (event.key === "Enter") {
                            //         this.handleOnChangeSearch(
                            //             event.target.value.trim()
                            //         );
                            //     }
                            // }}
                            onChange={(event) =>
                                this.handleOnChangeSearch(
                                    event.target.value.trim()
                                )
                            }
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {searchResult.length > 0 &&
                            searchResult.map((book) => {
                                booksOnShelf.forEach((bookOnShelf) => {
                                    if (book.id === bookOnShelf.id) {
                                        book.shelf = bookOnShelf.shelf;
                                    }
                                });
                                return (
                                    <Book
                                        key={book.id}
                                        id={book.id}
                                        book={book}
                                        onStatusChange={(book, shelf) =>
                                            onBookShelfChange(book, shelf)
                                        }
                                    />
                                );
                            })}
                    </ol>
                </div>
            </div>
        );
    }
}

export default BookSearch;
