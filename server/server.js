const express = require('express');
const app = express();
const { cloudinary } = require('/utils/cloudinary');

//get server set up on production or local port

const port = process.env.port || 3001

app.use(express.json({ limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

app.post('/api/upload', (req, res) => {
    try {
        const fileString = req.body.data;
        console.log(fileString)

    } catch (error) {
        console.error(error)
    }
})



app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
});
