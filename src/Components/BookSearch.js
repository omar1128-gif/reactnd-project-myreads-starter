import React, { Component } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import "./BookSearch.css";
import * as BooksAPI from "../BooksAPI";
import PropTypes from "prop-types";

class BookSearch extends Component {
    state = {
        searchResult: [],
        query: "",
    };

    handleOnChangeSearch = (query) => {
        this.setState({ query });
        this.fetchResults(query);
    };

    fetchResults = async (query) => {
        try {
            if (!query) {
                this.setState({
                    searchResult: [],
                });
            } else {
                const res = await BooksAPI.search(query);
                if (query === this.state.query) {
                    if (res.hasOwnProperty("error")) {
                        this.setState({
                            searchResult: [],
                        });
                    } else {
                        this.setState({
                            searchResult: res,
                        });
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    render() {
        const { searchResult, query } = this.state;
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
                            value={query}
                            onChange={(event) => {
                                this.handleOnChangeSearch(
                                    event.target.value.trim()
                                );
                            }}
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

BookSearch.propTypes = {
    booksOnShelf: PropTypes.array.isRequired,
    onBookShelfChange: PropTypes.func.isRequired,
};

export default BookSearch;
