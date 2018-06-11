import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setHeight, setWidth, 
         setQuality,
         switchPercent
 } from '../actions/SettingAction';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH, DEFAULT_QUALITY } from '../Constants';
import './Settings.css';

class Settings extends Component {

    constructor(props) {
        super(props);
        this.setHeight = this.props.setHeight.bind(this);
        this.setWidth = this.props.setWidth.bind(this);
        this.setQuality = this.props.setQuality.bind(this);
        this.switchPercent = this.props.switchPercent.bind(this);
    }

    render() {
        return (
            <form className="form-container mb-4">
                <label><h3>Settings</h3></label>
                <hr />
                <div className="row mb-2">
                    <label htmlFor="width" className="col-md-auto col-form-label">Width</label>
                    <div className="col-sm-2">
                        <input type="number" className="form-control" min={32} max={1920}
                            id="width" onChange={evt => this.setWidth(evt.target.value)}
                            defaultValue={DEFAULT_WIDTH} disabled={this.props.usePercent}/>
                    </div>
                    <label htmlFor="height" className="col-md-auto col-form-label">Height</label>
                    <div className="col-sm-2">
                        <input type="number" className="form-control mb-2" min={32} max={1920}
                            id="height" onChange={evt => this.setHeight(evt.target.value)}
                            defaultValue={DEFAULT_HEIGHT} disabled={this.props.usePercent}/>
                    </div>
                    <div className="col-md-6">
                        <div className="d-inline custom-control custom-checkbox">
                            <input className="custom-control-input" type="checkbox" id="percent"
                                    onChange={evt => this.switchPercent(evt.target.checked)} />
                            <label className="custom-control-label" htmlFor="percent">Percent</label>
                            <input type="range" className="custom-range" min={10} max={100}
                                id="percentSlider" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <label htmlFor="customRange" className="col-md-auto col-form-label">
                        Quality ( {this.props.quality} )</label>
                    <div className="col-sm-4 pt-2">
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
        width: state.SettingReducer.width,
        height: state.SettingReducer.height,
        quality: state.SettingReducer.quality,
        usePercent : state.SettingReducer.usePercent
    }
}

export default connect(mapStatetoProps, {
    setHeight,
    setWidth,
    setQuality,
    switchPercent
})(Settings);