import React, { Component } from 'react';
import './Settings.css';

class Settings extends Component {
    render() {
        return (
                <form className="form-container">
                    <label>Settings</label>
                    <hr/>
                    <div className="form-group row">
                        <label htmlFor="width" className="col-md-auto col-form-label">Width</label>
                        <div className="col-sm-2">
                            <input type="number" className="form-control" min={32} max={1920}
                            id="width" defaultValue={32}/>
                        </div>
                        <label htmlFor="height" className="col-md-auto col-form-label">Height</label>
                        <div className="col-sm-2">
                            <input type="number" className="form-control" min={32} max={1920}
                            id="height" defaultValue={32}/>
                        </div>
                    </div>
                </form>
        )
    }
}

export default Settings;
