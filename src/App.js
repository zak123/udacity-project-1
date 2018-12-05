import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {CurrentlyReading, WantToRead, Read} from './Home'
import {Search} from "./Search";
import {getAll} from "./BooksAPI";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
      showSearchPage: false,
      currentlyReadingBooks: [],
      wantToReadBooks: [],
      readBooks: [],
  };

  componentDidMount() {
    console.log('hello udacity');
    this.refreshBooks();
  }

  refreshBooks() {
      console.log('state update');

      getAll().then( res => {
          console.log(res);
          this.setState({
              currentlyReadingBooks: res.filter(obj => obj['shelf'] === 'currentlyReading'),
              wantToReadBooks: res.filter(obj => obj['shelf'] === 'wantToRead'),
              readBooks: res.filter(obj => obj['shelf'] === 'read'),
          });
      });
  }


  render() {


    return (
      <div className="app">
        {this.state.showSearchPage ? (
         <Search/>
        ) : (
          <div className="list-books">
              <div className="list-books-title">
                  <h1>MyReads</h1>
              </div>
            <div className="list-books-content">
              <div>
                  <CurrentlyReading books={this.state.currentlyReadingBooks} refresh={this.refreshBooks}/>
                  <WantToRead books={this.state.wantToReadBooks} refresh={this.refreshBooks}/>
                  <Read books={this.state.readBooks} refresh={this.refreshBooks}/>
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
