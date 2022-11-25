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
        const booksCollection = booksDB.collection('booksCollection');
        const ordersCollection = booksDB.collection('ordersCollection');

        app.post('/orders',async(req, res)=>{
            const order = req.body;
            const result = await ordersCollection.insertOne(order)
            res.send(result);
        })

        app.get('/categoryBooks/:id',async(req, res)=>{
            const id = req.params.id;
            const filter = {categoryId: id}
            const result = await booksCollection.find(filter).toArray();
            res.send(result)
        })


        // app.post('/books', async(req, res)=>{
        //     const docs = [];
        //     const result = await booksCollection.insertMany(docs)
        //     res.send(result)
        // })

        app.get('/categories', async(req, res)=>{
            const query = {};
            const categories = await categoriesCollection.find(query).toArray();
            res.send(categories)
        })
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