import React from 'react'
import {search} from "./BooksAPI";
import {Book} from "./Book";
import {Link } from 'react-router-dom';


export class SearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
        };

        this.handleSearch = this.handleSearch.bind(this);

    }

    handleSearch(event) {
        search(event.target.value).then(res => {
            console.log(res);
            if (res !== undefined && !res['error']) {
              res.forEach(book => {
                this.props.data.forEach(savedBook => {
                  if (book['id'] === savedBook['id']) {
                    book['shelf'] = savedBook['shelf'];
                  }
                })
              });

              console.log(res);
              this.setState({
                searchResults: res,
              });
            }

        });
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/'>
                        <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input type="text" placeholder="Search by title or author" onChange={this.handleSearch}/>

                    </div>
                </div>
                <SearchResults books={this.state.searchResults} update={this.props.update}/>
            </div>
        )
    }

}

export class SearchResults extends React.Component {
    render() {
        let renderBooks = Array.isArray(this.props.books) ? this.props.books.map((book) => (
            <li key={book['id']}><Book data={book} update={this.props.update}/></li>
        )) : <p>No results found.</p>;



        return (
            <div className="search-books-results">
                <ol className="books-grid">
                    {renderBooks}
                </ol>
            </div>
        )
    }
}