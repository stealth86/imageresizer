import React, { Component } from 'react';
import { connect } from 'react-redux';
import { switchDownload } from '../actions/ControlAction';
import ResizeWorker from '../workers/Resize.worker';
import './Controls.css';

class Controls extends Component {

    constructor(props) {
        super(props);
        this.updatefiles = this.updatefiles.bind(this);
        this.switchDownload = this.props.switchDownload.bind(this);
        this.resize = this.resize.bind(this);
    }

    updatefiles() {
        this.refs.lab.innerHTML = this.refs.selectfile.files.length + " Files Chosen";
    }

    saveByteArray = (() => {
        var a = document.createElement("a");
        a.style = "display: none";
        return (blob, name) => {
            var url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = name;
            a.click();
            window.URL.revokeObjectURL(url);
        }
    })();

    resize() {
        this.worker = new ResizeWorker();
        this.worker.onmessage = (event) => {
            //console.log(event.data.image);
            if (this.props.download)
                this.saveByteArray(event.data.image, event.data.filename);
        }
        this.worker.postMessage({
            files: this.refs.selectfile.files,
            width: this.props.width,
            height: this.props.height,
        });
    }

    render() {
        return (
            <div className="row mb-4">
                <div className="col-md-4">
                    <div className="input-group">
                        <div className="custom-file">
                            <input ref="selectfile" type="file" className="custom-file-input"
                                id="inputGroupFile02" onChange={this.updatefiles} multiple="true" />
                            <label ref="lab" className="custom-file-label" htmlFor="inputGroupFile02">Choose files</label>
                        </div>
                    </div>
                </div>
                <div className="col px-4 py-2">
                    <div className="progress-height progress">
                        <div className="progress-bar progress-bar-striped progress-bar-animated"
                            role="progressbar" style={{ width: '70%' }}
                            aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">Processing...</div>
                    </div>
                </div>
                <div className="col-md-auto">
                    <div className="custom-control custom-checkbox float-left p-2">
                        <input className="custom-control-input" type="checkbox" id="inlineCheckbox1" onChange={this.switchDownload} />
                        <label className="custom-control-label" htmlFor="inlineCheckbox1">Download</label>
                    </div>
                    <button className="btn btn-primary" onClick={this.resize}>Resize</button>
                </div>
            </div>
        );
    }
}

function mapStatetoProps(state) {
    return {
        download: state.ControlReducer.download,
        width: state.SettingReducer.width,
        height: state.SettingReducer.height
    }
}

export default connect(mapStatetoProps, {
    switchDownload
})(Controls);