import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Home from './views/Home';
import User from './views/User';
import About from './views/About';
import Navbar from './components/Navbar';

import 'bulma/css/bulma.css';
import './App.css';

class App extends Component {
    render() {
        return (
			<Router>
				<div className="App">
					<Navbar />
					<Route exact path="/" component={Home}/>
					<Route path="/user" component={User}/>
					<Route path="/about" component={About}/>
				</div>
			</Router>
        );
    }
}

export default App;
