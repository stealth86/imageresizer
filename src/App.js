import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { store, history } from './store';
import Controls from './components/Controls';
import Settings from './components/Settings';
import ImageMatrix from './components/ImageMatrix';
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
                This Webapp is simple image resizer and converter for JPEG images.
                It can convert to JPEG or PNG format.
                It utilizes Web workers to resize image at client side and download to your
                Downloads directory automatically with the desired resolution.
                Currently supports only JPEG images.
          </p>
            </div>
            <Settings />
            <Controls />
            <ImageMatrix />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
