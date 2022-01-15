const express = require('express');
const upload = require('express-fileupload')
require("dotenv").config();
var cloudinary = require('cloudinary').v2;

// console.log(cloudinary.config().cloud_name)

const app = express();

app.use(upload())

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/index.html');
})


app.post('/', async (req, res) => {

  if(req.files){
    
    const file = req.files.files;
    const filename = file.name;
    
    file.mv('./uploads/'+filename, async (err) => {
      if(err){
        res.send(err);
      }else{
        res.send('file uploaded');
      }

      const result = await cloudinary.uploader.upload( './uploads/'+filename, {
        resource_type: "image",
      });

      console.log(result)

    })    

  }else{
    console.log('file not found')
  }

})

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('App is running on Port: '+port);
});