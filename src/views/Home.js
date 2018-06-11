import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Result from '../components/Result';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            search: '',
            results: [ {content: "YAYAY"} ]
        }
    }
    render() {
        return (
            <div className="Home">
                <section className="hero is-fullheight is-garlic">
                    <div className="hero-body">
                        <div className="container">
                            <input className="input card full-input interact-shadow" type="text" placeholder="Search for an user..." />
                            {this.state.results.length > 0 ? '' :
                                <Link id="search-help" className="help-text" to="/about">What is this?</Link> 
                            }
                            <div className="card-list">
                                {this.state.results.map(function(result, index){
                                    return <Result key={ index } content={result.content} />;
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Home;
