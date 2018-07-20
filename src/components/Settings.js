import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    setHeight, setWidth,
    setQuality, setPercent,
    switchPercent,
    setFromFormat, setToFormat
} from '../actions/SettingAction';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH, DEFAULT_QUALITY, 
         DEFAULT_PERCENT, FORMAT_JPG, FORMAT_PNG,FORMATS } from '../Constants';
import './Settings.css';

class Settings extends Component {

    constructor(props) {
        super(props);
        this.setHeight = this.props.setHeight.bind(this);
        this.setWidth = this.props.setWidth.bind(this);
        this.setQuality = this.props.setQuality.bind(this);
        this.setPercent = this.props.setPercent.bind(this);
        this.setFromFormat = this.props.setFromFormat.bind(this);
        this.setToFormat = this.props.setToFormat.bind(this);
        this.switchPercent = this.props.switchPercent.bind(this);
    }

    render() {
        return (
            <form className="form-container mb-4">
                <label><h3>Settings</h3></label>
                <hr />
                <div className="row mb-2">
                    <div className="col">
                        <div className="row float-left">
                            <label className="col-md-2 col-form-label text-right">From</label>
                            <div className="col-md-4">
                                <select className="custom-select" onChange={evt=> this.setFromFormat(evt.target.value)} 
                                defaultValue={FORMAT_JPG}>
                                    <option value={FORMAT_JPG}>{FORMATS[FORMAT_JPG].value}</option>
                                    <option value={FORMAT_PNG}>{FORMATS[FORMAT_PNG].value}</option>
                                </select>
                            </div>
                            <label className="col-md-2 col-form-label text-right">To</label>
                            <div className="col-md-4">
                                <select className="custom-select" onChange={evt=> this.setToFormat(evt.target.value)} 
                                defaultValue={FORMAT_JPG}>
                                    <option value={FORMAT_JPG}>{FORMATS[FORMAT_JPG].value}</option>
                                    <option value={FORMAT_PNG}>{FORMATS[FORMAT_PNG].value}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row float-right">
                            <label htmlFor="width" className="col-md-2 col-form-label text-right">Width</label>
                            <div className="col-md-4">
                                <input type="number" className="form-control" min={32} max={1920}
                                    id="width" onChange={evt => this.setWidth(evt.target.value)}
                                    defaultValue={DEFAULT_WIDTH} disabled={this.props.usePercent} />
                            </div>
                            <label htmlFor="height" className="col-md-2 col-form-label text-right">Height</label>
                            <div className="col-md-4">
                                <input type="number" className="form-control mb-2" min={32} max={1920}
                                    id="height" onChange={evt => this.setHeight(evt.target.value)}
                                    defaultValue={DEFAULT_HEIGHT} disabled={this.props.usePercent} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-md-auto">
                        <div className="custom-control custom-checkbox">
                            <input className="custom-control-input" type="checkbox" id="percent"
                                onChange={evt => this.switchPercent(evt.target.checked)} />
                            <label className="custom-control-label" htmlFor="percent">Percent ( {this.props.percent} )</label>
                        </div>
                    </div>
                    <div className="col">
                        <input type="range" className="custom-range" min={10} max={100}
                            id="percentSlider" onChange={evt => this.setPercent(evt.target.value)}
                            defaultValue={DEFAULT_PERCENT} disabled={!this.props.usePercent} />
                    </div>
                </div>
                <div className={"row mb-2 "+(this.props.toFormat===FORMAT_PNG?"invisible":"visible")}>
                    <div className="col-md-auto">
                        <label htmlFor="customRange" className="col-md-auto col-form-label">
                            Quality ( {this.props.quality} )</label>
                    </div>
                    <div className="col pt-2 ">
                        <input type="range" className="custom-range" min={30} max={100} step={5}
                            id="customRange" onChange={evt => this.setQuality(evt.target.value)}
                            defaultValue={DEFAULT_QUALITY} />
                    </div>
                </div>
            </form>
        )
    }
}

function mapStatetoProps(state) {
    return {
        quality: state.SettingReducer.quality,
        percent: state.SettingReducer.percent,
        toFormat : state.SettingReducer.toFormat,
        usePercent: state.SettingReducer.usePercent
    }
}

export default connect(mapStatetoProps, {
    setHeight,
    setWidth,
    setQuality,
    setPercent,
    setFromFormat,
    setToFormat,
    switchPercent
})(Settings);