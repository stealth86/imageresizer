import resizeImage from "../utils/ResizeImageData";
import jpegjs from "jpeg-js";
import { PNG as pngjs } from "pngjs";
import * as CONST from "../Constants";

self.onmessage = (event) => {
    //console.log(this);
    //console.log(event.data)
    self.width = event.data.width;
    self.height = event.data.height;
    self.quality = event.data.quality;
    self.file = event.data.file;
    self.usePercent = event.data.usePercent;
    self.percent = event.data.percent;
    self.fromFormat = event.data.fromFormat;
    self.toFormat = event.data.toFormat;
    self.image = event.data.image;
    //console.log(self.filesToUpload);
    ((infile) => {
        var reader = new FileReader();
        reader.onload = (e) => {
            //console.log(e.target.result);
            if (self.fromFormat === CONST.FORMAT_PNG) {
                new pngjs().parse(e.target.result,
                    (error, data) => {
                        if (error) {
                            console.log(error.message)
                        } else {
                            var rawImageData = { data: data.data, width: data.width, height: data.height }
                            var resizedImageData = self.resizeRawImage(rawImageData, self.width, self.height, self.usePercent, self.percent)
                            self.convertImage(self.toFormat, resizedImageData, self.quality,infile)
                        }
                    })
            }
            else {
                var rawImageData = jpegjs.decode(e.target.result);
                var resizedImageData = self.resizeRawImage(rawImageData, self.width, self.height, self.usePercent, self.percent)
                self.convertImage(self.toFormat, resizedImageData, self.quality,infile)
            }

            //console.log(resizedRawImageData);

            //console.log(resizedImage);
            //var b64encoded = btoa(Uint8ToString(resizedImage.data));
        }
        reader.readAsArrayBuffer(infile);
    })(self.file);

}

self.resizeRawImage = (rawImageData, width, height, usePercent, percent) => {
    self.width = width
    self.height = height
    if (usePercent) {
        self.width = Math.ceil(rawImageData.width * percent / 100)
        self.height = Math.ceil(rawImageData.height * percent / 100)
    }
    return resizeImage(rawImageData, self.width, self.height);
}

self.convertImage = (toFormat, resizedRawImageData, quality,infile) => {
    if (toFormat === CONST.FORMAT_PNG) {
        let png = new pngjs({
            width: resizedRawImageData.width,
            height: resizedRawImageData.height,
            bitDepth: 8,
            colorType: 6,
            inputColorType: 6,
            inputHasAlpha: true
        });

        png.data = resizedRawImageData.data;
        let stream = png.pack();
        let chunks = []
        stream
            .on('data', function (chunk) {
                chunks.push(chunk)
            })
            .on('end', function () {
                var blob = new Blob(chunks, { type: CONST.FORMATS[CONST.FORMAT_PNG].mimetype })
                //console.log(blob)
                self.postMessage({
                    image: blob,
                    filename: infile.name.replace(/\.[^/.]+$/, "").concat(CONST.FORMATS[CONST.FORMAT_PNG].extension)
                });
            })
    }
    else {
        let resizedImage = jpegjs.encode({
            data: resizedRawImageData.data,
            width: resizedRawImageData.width,
            height: resizedRawImageData.height
        }, quality);
        let blobImage = new Blob([resizedImage.data], { type: CONST.FORMATS[CONST.FORMAT_JPG].mimetype });
        self.postMessage({
            image: blobImage,
            filename: infile.name.replace(/\.[^/.]+$/, "").concat(CONST.FORMATS[CONST.FORMAT_JPG].extension)
        });
    }
}
