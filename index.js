const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();

const port = 1337;

app.use(fileUpload({
    createParentPath: true
}));

app.use(cors());
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/startproc', function (req, res) {
  //do the POST to localhost
  
})

app.post('/teneofileupload', async (req,res) => {
	
try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let f = req.files.file
			
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            f.mv('./uploads/' + f.name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: f.name,
                    mimetype: f.mimetype,
                    size: f.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port, () => console.log(`App listening on port ${port}!`))