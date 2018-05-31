import React, { Component } from 'react';
import { Button, Switch, Classes } from '@blueprintjs/core';
import './App.css';
import logo from './logo.svg';

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      download : false
    }
    this.ResizeImage = this.ResizeImage.bind(this);
    this.updatefiles = this.updatefiles.bind(this);
    this.setdownload = this.setdownload.bind(this);
  }

  setdownload(){
    var downloadvar=!this.state.download;
    this.setState({download:downloadvar});
  }

  updatefiles() {
    console.log(this.refs.lab);
    this.refs.lab.innerHTML = this.refs.selectfile.files.length + " files chosen";
  }

  ResizeImage() {
    console.log(this.state.download)
    var filesToUpload = document.getElementById('imageFile').files;
    //filesToUpload.forEach(function(file){
    // Set the image once loaded into file reader

    for (var i = 0; i < filesToUpload.length; i++) {
      var file = filesToUpload[i];
      ((infile) => {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.renderimg(e.target.result, infile.name);
          //alert(file.name);
        }
        reader.readAsDataURL(infile);
      })(file);
      // Load files into file reader
      //});
    }
  }

  renderimg(src, file) {
    //alert(file);
    var image = new Image();
    image.onload = ((filename) => () => {
      var canvas = document.createElement("canvas");
      var MAX_WIDTH = 1920;
      var MAX_HEIGHT = 1920;
      var width = image.width;
      var height = image.height;
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(image, 0, 0, width, height);
      var dataurl = canvas.toDataURL("image/jpeg");
      document.getElementById('output').src = dataurl;
      this.saveBase64AsFile(dataurl, filename)
      //document.getElementById('link').href=dataurl;
    })(file);
    image.src = src;
  }

  saveBase64AsFile(base64, fileName) {

    var link = document.createElement("a");

    link.setAttribute("href", base64);
    link.setAttribute("download", fileName);
    if(this.state.download)
    link.click();
  }

  render() {
    return (
      <div className="container">
        <h1>Image Resizer</h1>
        <div className="choosefile">
          <label htmlFor="imageFile" className={Classes.BUTTON}>Select Files</label>
          <label ref="lab">No Files Chosen</label>
          <input ref="selectfile" id="imageFile" type="file" onChange={this.updatefiles} multiple />
          <div className="resize">
          <div className="d-inline">
          <Switch onChange={this.setdownload} checked={this.state.download} className="d-inline" label="Download"/>
          </div>
        <Button onClick={this.ResizeImage} text="Resize Image" />
        </div>
        </div>
        <img src={logo} id="output" alt="output" />
      </div>
    );
  }
}

export default App;
