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
            if (this.fromFormat === CONST.FORMAT_PNG) {
                new pngjs().parse(e.target.result,
                    (error, data) => {
                        if (error) {
                            console.log(error.message)
                        } else {
                            var rawImageData = { data: data.data, width: data.width, height: data.height }
                            var resizedImageData = resizeRawImage(rawImageData, this.width, this.height, this.usePercent, this.percent)
                            convertImage(this.toFormat, resizedImageData, this.quality,infile)
                        }
                    })
            }
            else {
                var rawImageData = jpegjs.decode(e.target.result);
                var resizedImageData = resizeRawImage(rawImageData, this.width, this.height, this.usePercent, this.percent)
                convertImage(this.toFormat, resizedImageData, this.quality,infile)
            }

            //console.log(resizedRawImageData);

            //console.log(resizedImage);
            //var b64encoded = btoa(Uint8ToString(resizedImage.data));
        }
        reader.readAsArrayBuffer(infile);
    })(this.file);

}

resizeRawImage = (rawImageData, width, height, usePercent, percent) => {
    this.width = width
    this.height = height
    if (usePercent) {
        this.width = Math.ceil(rawImageData.width * percent / 100)
        this.height = Math.ceil(rawImageData.height * percent / 100)
    }
    return resizeImage(rawImageData, this.width, this.height);
}

convertImage = (toFormat, resizedRawImageData, quality,infile) => {
    if (toFormat === CONST.FORMAT_PNG) {
        var png = new pngjs({
            width: resizedRawImageData.width,
            height: resizedRawImageData.height,
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
            width: resizedRawImageData.width,
            height: resizedRawImageData.height
        }, quality);
        var blobImage = new Blob([resizedImage.data], { type: CONST.FORMATS[CONST.FORMAT_JPG].mimetype });
        postMessage({
            image: blobImage,
            filename: infile.name.replace(/\.[^/.]+$/, "").concat(CONST.FORMATS[CONST.FORMAT_JPG].extension)
        });
    }
}