import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Navbar extends Component {
	toggleNav() {
		var nav = document.querySelector('.navbar-menu');
		if(nav.className === "navbar-menu") {
			nav.className = "navbar-menu is-active";
		} else {
			nav.className = "navbar-menu";
		}
	}
    render() {
        return (
			<nav id="navbar" className="navbar is-fixed-top" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/">
                        <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28" />
                    </Link>

                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" onClick={this.toggleNav}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div id="navbarMenu" className="navbar-menu">
                    <Link className="navbar-item" to="/">Search</Link>
                    <Link className="navbar-item" to="/about">About</Link>
                </div>
			</nav>
        );
    }
}

export default Navbar;
