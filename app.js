const express = require('express');
const bodyParser = require('body-parser');

const {useDB, addNewWorker} = require('./db/workersTable');
const {createTables} = require('./db/createTables');

const app = express();

const DB_PATH = './db/feedback.db';
const feedbackDB = useDB(DB_PATH);

app.use(bodyParser.json());

//home page - GET
app.get('/', (req, res) => {
    res.json({msg: "Hello Nigggurrsss!!! Testing mic 1..2..1..2"});
});

// signup - POST
app.post('/signup', (req, res) => {
    try{
        const {name, email, password, imagePath} = req.body;

        addNewWorker(
            feedbackDB, 
            name, 
            email, 
            password, 
            imagePath
        );
        
        return res.json({
            status: 200,
            success: true,
        })
    }catch(err){
        return res.json({
            status: 400,
            success: false,
        });
    }
});

const port = 3000;

app.listen(port, () => {
    createTables(DB_PATH);
    console.log(`Starting app on port ${port}`);
});


