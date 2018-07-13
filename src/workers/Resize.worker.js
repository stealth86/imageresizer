const resizeImage = require("../utils/ResizeImageData");
const jpegjs = require("jpeg-js");
const pngjs = require("pngjs").PNG;

onmessage = (event) => {
    this.width = event.data.width;
    this.height = event.data.height;
    this.quality = event.data.quality;
    this.filesToUpload = event.data.files;
    this.usePercent = event.data.usePercent;
    this.percent = event.data.percent;
    //this.image = event.data.image;
    //console.log(this.filesToUpload);
    for (var i = 0; i < this.filesToUpload.length; i++) {
        var file = this.filesToUpload[i];
        ((infile) => {
            var reader = new FileReader();
            reader.onload = (e) => {
                //console.log(e.target.result);
                var rawImageData = jpegjs.decode(e.target.result);
                if (this.usePercent) {
                    this.width = Math.ceil(rawImageData.width * this.percent / 100)
                    this.height = Math.ceil(rawImageData.height * this.percent / 100)
                }
                var resizedRawImageData = resizeImage(rawImageData, this.width, this.height);
                //console.log(resizedRawImageData);
                var resizedImage = jpegjs.encode({
                    data: resizedRawImageData.data,
                    width: this.width,
                    height: this.height
                }, this.quality);
                //console.log(resizedImage);
                //var b64encoded = btoa(Uint8ToString(resizedImage.data));
                var blobImage = new Blob([resizedImage.data], { type: "Image/jpeg" });
                var png = new pngjs({
                    width: this.width,
                    height: this.height,
                    bitDepth: 8,
                    colorType: 6,
                    inputColorType: 6,
                    inputHasAlpha: true
                });

                png.data = resizedRawImageData.data;
                var stream = png.pack();
                var chunks = []
                stream
                    .on('data', function (chunk) {
                        chunks.push(chunk)
                    })
                    .on('end', function () {
                        var blob =  new Blob(chunks, { type: "image/png" })
                        //console.log(blob)
                        postMessage({ image: blob, filename: infile.name.replace(/\.[^/.]+$/, "").concat(".png") });
                    })
                //postMessage({ image: blobImage, filename: infile.name });
            }
            reader.readAsArrayBuffer(infile);
        })(file);
    }
}