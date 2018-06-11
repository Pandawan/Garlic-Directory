import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Result extends Component {
    render() {
        return (
            <Link className="Result" to="/user">
                <div className="card interact-shadow card-result">
                    <div className="card-content">
						{ !this.props.error ? '' :
							<p className="has-text-danger">{this.props.error}</p>
						}
						{ !this.props.data ? '' :
							<div className="user-info">
								<h1 className="subtitle">{this.props.data.name}</h1>
								<p>{this.props.data.bio}</p>
							</div>
						}
                    </div>
                </div>
            </Link>
        );
    }
}

export default Result;