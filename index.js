const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
const jwt = require('jsonwebtoken');


// middle ware 
app.use(cors())
app.use(express.json())
 


//mongoDB connection
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.rz3ftkv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri); 
// console.log(uri)
async function run() {
    try {
        const booksDB = client.db('booksDB');
        const categoriesCollection = booksDB.collection('categoriesCollection');
    } 
    finally {
      
    }
  }
  run().catch(error => console.log(error));



app.get('/',(req,res)=>{
    res.send('Product resale server is running')
})

app.listen(port, ()=>{
    console.log(`Product resale server is running on ${port}`)
})