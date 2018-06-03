import React, { Component } from 'react';
import './Controls.css';

class Controls extends Component {

    constructor(props) {
        super(props);
        this.updatefiles = this.updatefiles.bind(this);
    }

    updatefiles() {
        this.refs.lab.innerHTML = this.refs.selectfile.files.length + " Files Chosen";
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="input-group mb-3">
                        <div className="custom-file">
                            <input ref="selectfile" type="file" className="custom-file-input"
                                id="inputGroupFile02" onChange={this.updatefiles} multiple="true" />
                            <label ref="lab" className="custom-file-label" htmlFor="inputGroupFile02">Choose files</label>
                        </div>
                    </div>
                </div>
                <div className="col"/>
                <div className="col-md-auto">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="inlineCheckbox1"/>
                        <label className="form-check-label" htmlFor="inlineCheckbox1">Download</label>
                    </div>
                    <button className="btn">Resize</button>
                </div>
            </div>
        );
    }
}

export default Controls;