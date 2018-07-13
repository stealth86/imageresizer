import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    switchDownload,
    switchPreview,
    addToImageList,
    updateProgress,
    resetImageList
} from '../actions/ControlAction';
import ResizeWorker from '../workers/Resize.worker';
import './Controls.css';

class Controls extends Component {

    constructor(props) {
        super(props);
        this.updatefiles = this.updatefiles.bind(this);
        this.switchDownload = this.props.switchDownload.bind(this);
        this.switchPreview = this.props.switchPreview.bind(this);
        this.addToImageList = this.props.addToImageList.bind(this);
        this.updateProgress = this.props.updateProgress.bind(this);
        this.resetImageList = this.props.resetImageList.bind(this);
        this.resize = this.resize.bind(this);
    }

    componentWillMount = () => {
        this.worker = new ResizeWorker();
        this.worker.onmessage = (event) => {
            //console.log(event.data.image);
            var status = "";
            if (this.props.progress.completed + 1 === this.selectfile.files.length)
                status = "Completed"
            else
                status = "Processing..."
            this.updateProgress({
                completed: this.props.progress.completed + 1,
                total: this.selectfile.files.length,
                status:status
            });
            if (this.props.preview) {
                this.saveImageList(event.data.image, event.data.filename, this.addToImageList)
            }
            if (this.props.download) {
                this.saveByteArray(event.data.image, event.data.filename);
            }
        }
    }

    updatefiles() {
        this.lab.innerHTML = this.selectfile.files.length + " Files Chosen";
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

    saveImageList = (() => {
        return (blob, name, callback) => {
            var url = window.URL.createObjectURL(blob);
            callback({
                image: url,
                filename: name
            })
        }
    })();

    resize() {
        this.resetImageList();
        this.updateProgress({
            completed: 0,
            total: 1,
            status:""
        })  
        this.worker.postMessage({
            files: this.selectfile.files,
            width: this.props.width,
            height: this.props.height,
            usePercent: this.props.usePercent,
            percent: this.props.percent,
            quality: this.props.quality
        });
    }

    render() {
        return (
            <div className="row mb-4">
                <div className="col-md-4">
                    <div className="input-group">
                        <div className="custom-file">
                            <input ref={el => this.selectfile = el} type="file" className="custom-file-input"
                                id="inputGroupFile02" onChange={this.updatefiles} accept=".jpg,.jpeg" multiple="true" />
                            <label ref={el => this.lab = el} className="custom-file-label" htmlFor="inputGroupFile02">Choose files</label>
                        </div>
                    </div>
                </div>
                <div className="col px-4 py-2">
                    <div className="progress-height progress">
                        <div className={"progress-bar "+
                            (this.props.progress.completed===this.props.progress.total ? 'bg-success' : '' ) +
                             " progress-bar-striped progress-bar-animated"}
                            role="progressbar" style={
                                { width: this.props.progress.completed * 100 / this.props.progress.total + '%' }}
                            aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">{this.props.progress.status}</div>
                    </div>
                </div>
                <div className="col-md-auto">
                    <div className="custom-control custom-checkbox float-left px-4 py-2">
                        <input className="custom-control-input" type="checkbox" id="inlineCheckbox1"
                            onChange={evt =>this.switchDownload(evt.target.checked)} />
                        <label className="custom-control-label" htmlFor="inlineCheckbox1">Download</label>
                    </div>
                    <div className="custom-control custom-checkbox float-left p-2">
                        <input className="custom-control-input" type="checkbox" id="inlineCheckbox2"
                            onChange={evt =>this.switchPreview(evt.target.checked)} />
                        <label className="custom-control-label" htmlFor="inlineCheckbox2">Preview</label>
                    </div>
                    <button className="btn btn-primary" onClick={this.resize}>Resize</button>
                </div>
            </div>
        );
    }
}

function mapStatetoProps(state) {
    return {
        progress: state.ControlReducer.progress,
        download: state.ControlReducer.download,
        preview: state.ControlReducer.preview,
        width: state.SettingReducer.width,
        height: state.SettingReducer.height,
        percent: state.SettingReducer.percent,
        usePercent : state.SettingReducer.usePercent,
        quality: state.SettingReducer.quality
    }
}

export default connect(mapStatetoProps, {
    switchDownload,
    switchPreview,
    addToImageList,
    updateProgress,
    resetImageList
})(Controls);