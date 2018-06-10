const resizeImage = require("../utils/ResizeImageData");
const jpegjs = require("jpeg-js");

onmessage = (event) => {
    this.width = event.data.width;
    this.height = event.data.height;
    this.filesToUpload = event.data.files;
    this.image = event.data.image;
    //console.log(this.filesToUpload);
    for (var i = 0; i < this.filesToUpload.length; i++) {
        var file = this.filesToUpload[i];
        ((infile) => {
            var reader = new FileReader();
            reader.onload = (e) => {
                //console.log(e.target.result);
                var rawImageData = jpegjs.decode(e.target.result);
                //console.log(rawImageData);
                var resizedRawImageData = resizeImage(rawImageData, this.width, this.height);
                //console.log(resizedRawImageData);
                var resizedImage = jpegjs.encode({
                    data: resizedRawImageData.data,
                    width: this.width,
                    height: this.height
                }, 95);
                //console.log(resizedImage);
                //var b64encoded = btoa(Uint8ToString(resizedImage.data));
                var blobImage = new Blob([resizedImage.data], { type: "Image/jpeg" });
                postMessage({ image: blobImage, filename:infile.name});
            }
            reader.readAsArrayBuffer(infile);
        })(file);
    }
}

Uint8ToString = (byteArray) => {
    var CHUNK_SZ = 0x8000;
    var result = [];
    for (var i = 0; i < byteArray.length; i += CHUNK_SZ) {
        result.push(String.fromCharCode.apply(null, byteArray.subarray(i, i + CHUNK_SZ)));
    }
    return result.join("");
}