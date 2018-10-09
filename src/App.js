import React, { Component } from 'react';
import './App.css';
import ArticleResults from './ArticleResults';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            sortBy: '',
            pageSize: '20',
            page: '1',
            apiKey: process.env.REACT_APP_API_KEY,
            results: { status: "empty" }
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        console.log('Sort: ' + this.state.sortBy);
        fetch('https://newsapi.org/v2/everything?q=' + encodeURI(this.state.query) + '&sortBy=' + this.state.sortBy + '&pageSize=' + this.state.pageSize + '&page=' + this.state.page, {
            method: "GET",
            headers: {
                "Authorization": this.state.apiKey
            }
        })
        .then((responseRaw) => {
            return responseRaw.json();
        })
        .then((response) => {
            this.setState({ results: response })
        })
        event.preventDefault();
    }

    populateArticles() {
        if (this.state.results.status === 'ok'){
            return this.state.results.articles.map(
                article =>
                    <article key={article.url} className="col-md-6 px-0 pb-5">
                        <div className="article-image">
                            <a href={article.url} target="_blank" rel="noopener noreferrer"><img src={article.urlToImage ? article.urlToImage : 'https://via.placeholder.com/575/666666/666666?text=No+image' } alt={article.title} className="img-fluid" /></a>
                        </div>
                        <div className="container px-5">
                            <h4><a href={article.url} target="_blank" rel="noopener noreferrer">{article.title}</a></h4>
                            <p>{article.description}</p>
                            <div id="ReadMore" className="pb-3">
                                <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-dark">Read More</a>
                            </div>
                        </div>
                    </article>
            )
        }
    }

    render() {
        return (
          <div className="App">
            <header className="App-header">
                <section className="container">
                    <div className="row">
                        <div className="col-7 col-md-6">
                            <input type="text" id="Query" name="query" placeholder="Enter your search term" onChange={this.handleInputChange} />
                        </div>
                        <div className="col-5 col-md-3">


                            <select name="sortBy" className="form-control-lg" onChange={this.handleInputChange}>
                                <option value="">Sort by:</option>
                                <option value="publishedAt">Date</option>
                                <option value="relevance">Relevance</option>
                                <option value="popularity">Popularity</option>
                            </select>
                        </div>
                        <div className="col-12 col-md-3">
                            <button id="Search" className="btn btn-danger" onClick={this.handleSubmit}>Search</button>
                        </div>
                    </div>
                </section>
            </header>

            <ArticleResults articles={this.populateArticles()} />

          </div>
        );
    }
}

export default App;
