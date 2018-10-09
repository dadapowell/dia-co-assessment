import React, { Component } from 'react';

class ArticleResults extends Component {
    render() {
        return (
            <section id="Results" className="container">
                <div className="row">
                    {this.props.articles}
                </div>
            </section>
        )
    }
}

export default ArticleResults;
