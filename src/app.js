const express=require('express');
const uploadVideo=require('./models/upload.model')
var bodyParser = require("body-parser");
require('./db/db')
const multer=require('multer');
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
const port = process.env.PORT
const app=express()
 
// upload a video to the server and returns the response
app.post('/upload/video', upload.single('video'),function (req, res) {
    console.log(req.file);
  //create a video
 const uploadvideo=new uploadVideo({
    video:req.file.path

});
//save uploaded video file path  in the database.
uploadvideo.save()
.then(data => {
    res.send(data);
}).catch(err => {
    res.status(500).send({
       message: err.message || "Some error occurred while uploading the video."
    });
});
});
//get uploaded video link
app.get('/getvideolink',function (req, res) {
    //console.log(req.body);
    uploadVideo.find()
    .then(uploadvideo => {
        res.send(uploadvideo);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving videos."
        });
    });

});
app.use('/uploads',express.static('uploads'))
 app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})