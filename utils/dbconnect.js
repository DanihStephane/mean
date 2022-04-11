const { MongoClient } = require('mongodb');

//const connectionString = "mongodb://localhost:27017";
 const connectionString = "mongodb+srv://danih:danih@cluster0.kyiyu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

async function getDb(){
    return MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then((client) => {
        const db = client.db('ekaly')
        return db;
    })
}

module.exports = {getDb}