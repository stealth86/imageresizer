var width=0;
var height=0;
var filesToUpload=[];
var image=null;

onmessage = (event) => {
    this.width=event.data.width;
    this.height=event.data.height;
    this.filesToUpload=event.data.files;
    this.image=event.data.image;
    //console.log(this.filesToUpload);
    for (var i = 0; i < this.filesToUpload.length; i++) {
        var file = this.filesToUpload[i];
        ((infile) => {
            var reader = new FileReader();
            reader.onload = (e) => {
                renderimg(e.target.result, infile.name);
            }
            reader.readAsDataURL(infile);
        })(file);
    }
}

renderimg = (src, file)=> {
    console.log(this.image);
    this.image.onload = ((filename) => () => {
        console.log(this.height);
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = this.width;
        canvas.height = this.height;
        ctx.drawImage(this.image, 0, 0, this.width, this.height);
        var dataurl = canvas.toDataURL("image/jpeg");
    })(file);
    this.image.src = src;
}