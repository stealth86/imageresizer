const resizeImage = require("../utils/ResizeImageData");
const jpegjs = require("jpeg-js");
const pngjs = require("pngjs").PNG;
const CONST = require("../Constants");

onmessage = (event) => {
    this.width = event.data.width;
    this.height = event.data.height;
    this.quality = event.data.quality;
    this.file = event.data.file;
    this.usePercent = event.data.usePercent;
    this.percent = event.data.percent;
    this.fromFormat = event.data.fromFormat;
    this.toFormat = event.data.toFormat;
    //this.image = event.data.image;
    //console.log(this.filesToUpload);
    ((infile) => {
        var reader = new FileReader();
        reader.onload = (e) => {
            //console.log(e.target.result);
            if(this.fromFormat===CONST.FORMAT_PNG){
                
            }
            else{
            var rawImageData = jpegjs.decode(e.target.result);
            }
            if (this.usePercent) {
                this.width = Math.ceil(rawImageData.width * this.percent / 100)
                this.height = Math.ceil(rawImageData.height * this.percent / 100)
            }
            var resizedRawImageData = resizeImage(rawImageData, this.width, this.height);
            //console.log(resizedRawImageData);
            
            //console.log(resizedImage);
            //var b64encoded = btoa(Uint8ToString(resizedImage.data));
            if (this.toFormat === CONST.FORMAT_PNG) {
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
                        var blob = new Blob(chunks, { type: CONST.FORMATS[CONST.FORMAT_PNG].mimetype })
                        //console.log(blob)
                        postMessage({
                            image: blob,
                            filename: infile.name.replace(/\.[^/.]+$/, "").concat(CONST.FORMATS[CONST.FORMAT_PNG].extension)
                        });
                    })
            }
            else {
                var resizedImage = jpegjs.encode({
                    data: resizedRawImageData.data,
                    width: this.width,
                    height: this.height
                }, this.quality);
                var blobImage = new Blob([resizedImage.data], { type: CONST.FORMATS[CONST.FORMAT_JPG].mimetype });
                postMessage({
                    image: blobImage,
                    filename: infile.name.replace(/\.[^/.]+$/, "").concat(CONST.FORMATS[CONST.FORMAT_JPG].extension)
                });
            }
        }
        reader.readAsArrayBuffer(infile);
    })(this.file);

}