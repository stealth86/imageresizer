import React, { Component } from 'react';
import Controls from './components/Controls';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      download: false
    }
    this.ResizeImage = this.ResizeImage.bind(this);
    this.setdownload = this.setdownload.bind(this);
  }

  setdownload() {
    var downloadvar = !this.state.download;
    this.setState({ download: downloadvar });
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
      //document.getElementById('output').src = dataurl;
      this.saveBase64AsFile(dataurl, filename)
      //document.getElementById('link').href=dataurl;
    })(file);
    image.src = src;
  }

  saveBase64AsFile(base64, fileName) {

    var link = document.createElement("a");

    link.setAttribute("href", base64);
    link.setAttribute("download", fileName);
    if (this.state.download)
      link.click();
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1 className="display-4">Image Resizer</h1>
          <p className="lead">
            This Webapp is simple image resizer for JPEG images
            It utilizes Html Canves element to resize image and download to your 
            Downloads directory automatically with the desired resolution.
          </p>
        </div>
        <Controls />
      </div>
    );
  }
}

export default App;
