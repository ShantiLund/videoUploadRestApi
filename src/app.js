const express=require('express');
var bodyParser = require("body-parser");

const multer=require('multer');
//const upload=multer({dest:'uploads/'});
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads/')
    },
    filename: function(req,file,cb){
        cb(null, file.originalname);
    }
});
const fileFilter=(req,file,cb)=>{
    //reject the file
    console.log("file filter is calling")
    if(file.mimetype ==='video/mp4')
    {
        cb(null,true)
    }
    else{
        console.log("file must be an mp4 file format")
        cb(null,false)
    }
}

const upload=multer(
    {storage:storage,
        limits:
        {
            filesize:1024*1024*5
        },
        fileFilter:fileFilter

    }
    );
//const uploadVideoROuter = require('./routers/uploadVideo.router');
const port = process.env.PORT
const app=express()
 
// respond with "hello world" when a GET request is made to the homepage
app.post('/hello', upload.single('video'),function (req, res) {
    console.log(req.file);
  res.send('hello world')
})
 app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})