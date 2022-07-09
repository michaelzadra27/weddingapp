const express = require('express');
const app = express();
const { cloudinary } = require('./utils/cloudinary');

//get server set up on production or local PORT

const PORT = process.env.PORT || 3001;
app.use(express.static(__dirname + '/'));

app.use(express.json({ limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

app.get('/api/images', async (req, res) => {
    console.log("hit")
    const {resources} = await cloudinary.search.expression('folder:weddingapp').sort_by('public_id', 'desc').max_results(30).execute();
    
    // .then(result=>console.log(result)
    // console.log("done")

    const publicIds = resources.map(file => file.public_id)
    res.json(publicIds)
    
    
})

app.post('/api/upload', async (req, res) => {
    try {
        const fileString = req.body.data;
        console.log(fileString)
        const uploadedMedia = await cloudinary.uploader.upload(fileString, {
            upload_preset: 'wedding_uploads'
        })
        console.log(uploadedMedia);
        res.json({msg: 'yayaa'})

    } catch (error) {
        console.error(error)
        res.status(500).json({err: 'something is off'})
    }
})



app.listen(PORT, ()=> {
    console.log(`listening on PORT ${PORT}`);
});
