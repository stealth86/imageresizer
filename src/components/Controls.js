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

    resize() {
        this.worker = new ResizeWorker();
        var imageObj = new Image();
        this.worker.postMessage({files:this.refs.selectfile.files,
                                width:this.props.width,
                                height:this.props.height,
                                image:imageObj});
            //clearTimeout(this.timer);
        /*var filesToUpload = this.refs.selectfile.files;
        for (var i = 0; i < filesToUpload.length; i++) {
            var file = filesToUpload[i];
            ((infile) => {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.renderimg(e.target.result, infile.name);
                }
                reader.readAsDataURL(infile);
            })(file);
        }*/
    }

    renderimg(src, file) {
        var image = new Image();
        image.onload = ((filename) => () => {
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.width = this.props.width;
            canvas.height = this.props.height;
            ctx.drawImage(image, 0, 0, this.props.width, this.props.height);
            var dataurl = canvas.toDataURL("image/jpeg");
            this.saveBase64AsFile(dataurl, filename)
        })(file);
        image.src = src;
    }

    saveBase64AsFile(base64, fileName) {

        var link = document.createElement("a");

        link.setAttribute("href", base64);
        link.setAttribute("download", fileName);
        if (this.props.download)
            link.click();
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
                <div className="col">
                <div className="processing-status">
                    <div className="progress-height progress">
                        <div className="progress-bar progress-bar-striped progress-bar-animated" 
                        role="progressbar" style={{width: '70%'}} 
                        aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">Processing...</div>
                    </div>
                    </div>
                </div>    
                <div className="col-md-auto">
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="checkbox" id="inlineCheckbox1" onChange={this.switchDownload} />
                        <label className="form-check-label" htmlFor="inlineCheckbox1">Download</label>
                    </div>
                    <button className="btn" onClick={this.resize}>Resize</button>
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