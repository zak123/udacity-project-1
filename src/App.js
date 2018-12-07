import React  from 'react'
import './App.css'
import {CurrentlyReading, WantToRead, Read} from './Home'
import {SearchComponent} from "./Search";
import {getAll} from "./BooksAPI";
import { Route, Switch, BrowserRouter, Link } from 'react-router-dom';

class BooksApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSearchPage: false,
            currentlyReadingBooks: [],
            wantToReadBooks: [],
            readBooks: [],
        };


    }




  componentDidMount() {
    console.log('hello udacity');
    this.refreshBooks();
  }

  refreshBooks = () => {
      console.log('state update');

      getAll().then( res => {
          console.log(res);
          this.setState(() => ({
              currentlyReadingBooks: res.filter(obj => obj['shelf'] === 'currentlyReading'),
              wantToReadBooks: res.filter(obj => obj['shelf'] === 'wantToRead'),
              readBooks: res.filter(obj => obj['shelf'] === 'read'),
          }));
      });
  };


  render() {


    return (
      <div className="app">
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
                <Link to='/search'>
                  <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
                </Link>
            </div>
          </div>
      </div>
    )
  }
}

class router extends React.Component {
    render() {
        return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={BooksApp}/>
                <Route path='/search' component={SearchComponent}/>
            </Switch>
        </BrowserRouter>
        )
    }
}

export default router
