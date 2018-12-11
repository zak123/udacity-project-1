import React from 'react'
import './App.css'
import {Book} from "./Book";


export class CurrentlyReading extends React.Component {
    render() {

        let renderBooks = null;
        if (this.props.books) {
            renderBooks = this.props.books.map((book) => (
                <li key={book['id']}><Book data={book} update={this.props.update}/></li>
            ));
        }

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {renderBooks}
                    </ol>
                </div>
            </div>
        )
    }
}

export class WantToRead extends React.Component {
    render() {
        let renderBooks = null;
        if (this.props.books) {
            renderBooks = this.props.books.map((book) => (
                <li key={book['id']}><Book data={book} update={this.props.update}/></li>
            ));
        }
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {renderBooks}
                    </ol>
                </div>
            </div>
        )
    }
}

export class Read extends React.Component {
    render() {
        let renderBooks = null;
        if (this.props.books) {
            renderBooks = this.props.books.map((book) => (
                <li key={book['id']}><Book data={book} update={this.props.update}/></li>
            ));
        }
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {renderBooks}
                    </ol>
                </div>
            </div>
        )
    }
}

