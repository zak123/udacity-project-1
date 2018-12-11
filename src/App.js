import React  from 'react'
import './App.css'
import {CurrentlyReading, WantToRead, Read} from './Home'
import {SearchComponent} from "./Search";
import {getAll, update} from "./BooksAPI";
import { Route, Switch, BrowserRouter, Link } from 'react-router-dom';

class BooksApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentlyReadingBooks: this.props.data.filter(obj => obj['shelf'] === 'currentlyReading'),
            wantToReadBooks: this.props.data.filter(obj => obj['shelf'] === 'wantToRead'),
            readBooks: this.props.data.filter(obj => obj['shelf'] === 'read'),
            data: this.props.data,
        };


    }


  componentDidMount() {
    console.log('props', this.props);
  }

  render() {

      console.log('render booksapp', this.props.data);

    return (
      <div className="app">
          <div className="list-books">
              <div className="list-books-title">
                  <h1>MyReads</h1>
              </div>
            <div className="list-books-content">
              <div>
                  <CurrentlyReading books={this.state.currentlyReadingBooks} update={this.props.update}/>
                  <WantToRead books={this.state.wantToReadBooks} update={this.props.update}/>
                  <Read books={this.state.readBooks} update={this.props.update}/>
              </div>
            </div>
            <div className="open-search">
                <Link to='/search'>
                  <button>Add a book</button>
                </Link>
            </div>
          </div>
      </div>
    )
  }
}

class router extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            data: [],
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

                data: res,
            }));
        });
    };


    updateBook = (book, shelf) => {
        console.log(book, shelf);

        update(book, shelf).then(res => {

            let newState = this.state.data.filter(obj => obj['id'] !== book['id']);
            book['shelf'] = shelf;
            newState.push(book);
            this.setState({
                data: newState,
            });
        });
    };

    render() {
        return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={() => <BooksApp data={this.state.data} update={this.updateBook}/>}/>
                <Route path='/search' component={() => <SearchComponent data={this.state.data} update={this.updateBook}/>}/>
            </Switch>
        </BrowserRouter>
        )
    }
}

export default router
