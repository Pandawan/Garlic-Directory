import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Result extends Component {
    render() {
        return (
            <Link className="Result" to="/user">
                <div className="card interact-shadow card-result">
                    <div className="card-content">
                        Card's results here
                        <p>{this.props.content}</p>
                    </div>
                </div>
            </Link>
        );
    }
}

export default Result;