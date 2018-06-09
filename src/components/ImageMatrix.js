import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ImageMatrix.css';
import logo from '../logo.svg';

class ImageMatrix extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: [1, 2, 3, 4]
        }
    }

    render() {
        return (
            <div className="row">
                {this.state.count.map((object, i) => {
                    return <div className="col-sm-3" key={i}>
                        <div className="card bg-light">
                            <img className="card-img" src={logo} alt="Card cap" />
                            <div className="card-img-overlay">
                                <p className="card-text">Filename</p>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        );
    }
}

export default ImageMatrix;
