import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setHeight, setWidth } from '../actions/SettingAction';
import { DEFAULT_HEIGHT,DEFAULT_WIDTH} from '../Constants';
import './Settings.css';

class Settings extends Component {

    constructor(props) {
        super(props);
        this.setHeight = this.props.setHeight.bind(this);
        this.setWidth = this.props.setWidth.bind(this);
    }

    render() {
        return (
            <form className="form-container mb-4">
                <label><h3>Settings</h3></label>
                <hr />
                <div className="form-group row">
                    <label htmlFor="width" className="col-md-auto col-form-label">Width</label>
                    <div className="col-sm-2">
                        <input type="number" className="form-control" min={32} max={1920}
                            id="width" onChange={evt => this.setWidth(evt.target.value)} 
                            defaultValue={DEFAULT_WIDTH} />
                    </div>
                    <label htmlFor="height" className="col-md-auto col-form-label">Height</label>
                    <div className="col-sm-2">
                        <input type="number" className="form-control" min={32} max={1920}
                            id="height" onChange={evt => this.setHeight(evt.target.value)} 
                            defaultValue={DEFAULT_HEIGHT} />
                    </div>
                </div>
            </form>
        )
    }
}

function mapStatetoProps(state) {
    return {
        width: state.SettingReducer.width,
        height: state.SettingReducer.height
    }
}

export default connect(mapStatetoProps, {
    setHeight,
    setWidth
})(Settings);