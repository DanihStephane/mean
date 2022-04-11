const express = require('express')
const bodyParser = require('body-parser')
const {MongoClient} = require('mongodb')
const cors = require('cors');

const connectionString = "mongodb+srv://m1p9mean-912:m1p9mean-912@cluster0.lpbgv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
function getDb(){
    return MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then((client) => {
        const db = client.db('e-kaly')
        return db;
    })
}

const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app
.post('/personnes', function(req, res){
    getDb()
    .then((db) => {
        const personneCollection = db.collection('personne')
        return personneCollection
        .insertOne(req.body)
        .then((result) => {
            res.json({status: 'SUCCESS', message: 'Personne created'});
        })
    })
    .catch((error) => {
        res.json({status: 'ERROR', message: error.message});
    })
})
.get('/personnes', function (req, res){
    getDb()
    .then((db) => {
        const personneCollection = db.collection('personne')
        return personneCollection
        .find()
        .toArray()
        .then((result) => {
            res.json({status: 'SUCCESS', data: result});
        })
    })
    .catch((error) => {
        res.json({status: 'ERROR', message: error.message});
    })
})

const port = 3000
app.listen(port, function (){
    console.log(`Listening on port ${port}`); 
})