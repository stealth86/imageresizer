import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ImageMatrix.css';

class ImageMatrix extends Component {
    
    render() {
        return (
            <div className="row">
                {this.props.imageList.map((image, i) => {
                    return <div className="col-xs-4 col-sm-3 col-md-2 mb-2" key={i}>
                        <div className="card bg-light">
                            <img className="card-img-top" src={image.image} alt="Card cap" />
                            <div className="card-body">
                                <p className="card-text">{image.filename}</p>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        );
    }
}

function mapStatetoProps(state) {
    return {
        imageList: state.ControlReducer.imageList
    }
}

export default connect(mapStatetoProps, {
})(ImageMatrix);
