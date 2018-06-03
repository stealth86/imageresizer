import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { store, history } from './store';
import Controls from './components/Controls';
import Settings from './components/Settings';
import './App.css';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div className="container">
            <div className="jumbotron">
              <h1 className="display-4">Image Resizer</h1>
              <p className="lead">
                This Webapp is simple image resizer for JPEG images.
                It utilizes Html Canves element to resize image and download to your
                Downloads directory automatically with the desired resolution.
          </p>
            </div>
            <Controls />
            <Settings />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
