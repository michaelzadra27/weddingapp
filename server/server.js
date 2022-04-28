const express = require('express');
const app = express();
const { cloudinary } = require('./utils/cloudinary');

//get server set up on production or local port

const port = process.env.port || 3001

app.use(express.json({ limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

app.get('/api/images', async (req, res) => {
    console.log("hit")
    const {resources} = await cloudinary.search.expression('folder:wedding_uploads').sort_by('public_id', 'desc').max_results(30).execute();
    console.log("done")

    const publicIds = resources.map(file => file.public_id)
    res.json(publicIds)
    console.log("files sens")
    
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



app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
});
