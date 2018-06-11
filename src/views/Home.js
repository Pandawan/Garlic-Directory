import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import {firestore} from '../firebase.js';

import Result from '../components/Result';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            search: '',
            results: [],
            error: ''
        }

        this.changeSearch = this.changeSearch.bind(this);
        this.submitSearch = this.submitSearch.bind(this);
	}
	changeSearch(e) {
        // TODO: Decide whether or not to reset results and error when starting to type something new
        // When the search input changes, set search and remove previous results
		this.setState({
            [e.target.name]: e.target.value.trim()
		});
    }
    submitSearch(e) {
        // Prevent from reloading when submitting a form
        e.preventDefault();

        // If search field is empty, reset cards
        if (!this.state.search) {
            this.setState({
                error: '',
                results: []
            });
            return;
        }

        console.log(`Searching for "${this.state.search}"`);

        // Fetch/query data from firestore
        const usersRef = firestore.collection('users');
        // TODO: Make this use full-text search like Algolia instead of exact search
        // Get user by name
        usersRef.where('name', '==', this.state.search).get().then((querySnapshot) => {
            if (querySnapshot) {
                // Reset results and map data
                const newResults = querySnapshot.docs.filter((doc) => doc.exists ? true : false).map((doc) => doc.data());
                this.setState({
                    results: newResults
                });
            }
            else {
                console.log(`No results found for "${this.state.search}"`);
                this.setState({
                    error: `No results found for "${this.state.search}"`
                });
            }
        }).catch((err) => {
            console.log(err);
            this.setState({
                error: err
            });
        });
    }
    render() {
        return (
            <div className="Home">
                <section className="hero is-fullheight is-garlic">
                    <div className="hero-body">
                        <div className="container">
                            <form className="control" onSubmit={this.submitSearch}>
                                <input className="input card full-input interact-shadow" name="search" type="text" placeholder="Search for an user..." autoComplete="off" onChange={this.changeSearch} value={this.state.search}/>
                            </form>
                            { this.state.results.length > 0 ? '' :
                                <Link id="search-help" className="help-text" to="/about">What is this?</Link> 
                            }
                            <div className="card-list">
                                {!this.state.error ? '' : 
                                    <Result error={this.state.error} />
                                }
                                {this.state.results.map(function(result, index){
                                    return <Result key={ index } data={result} />;
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
