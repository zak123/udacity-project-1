import React from 'react'
import './App.css'

export class Book extends React.Component {
    constructor(props) {
        super(props);
    }


    handleUpdate = (e) => {
        console.log(e.target.value);



        this.props.update(this.props.data, e.target.value);
    };


    render() {
        let renderAuthors = this.props.data['authors'] ? this.props.data['authors'].map((author) => (
            <div key={author} className="book-authors">{author}</div>
        )) : <p className='book-authors'>No Author Found</p>;

        let renderCover = this.props.data['imageLinks'] && this.props.data['imageLinks']['smallThumbnail'] ? <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.data['imageLinks']['smallThumbnail']})` }}></div> : null;

        return (
            <div className="book">
                <div className="book-top">
                    {renderCover}
                    <div className="book-shelf-changer">
                        <select onChange={this.handleUpdate} value={this.props.data['shelf'] || 'none'}>
                            <option value="move">Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.data['title']}</div>
                {renderAuthors}
            </div>
        )
    }
}

