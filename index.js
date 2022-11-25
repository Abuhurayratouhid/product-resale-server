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

        app.get('/categoryBooks/:id',async(req, res)=>{
            const id = req.params.id;
            const filter = {categoryId: id}
            const result = await booksCollection.find(filter).toArray();
            res.send(result)
        })


        app.post('/books', async(req, res)=>{
            const docs = [
                {
                  "originalPrice": "$789",
                  "resalePrice": "$335",
                  "rating": 4,
                  "categoryId": "637fab7fba4156c5fcd4ddcd",
                  "picture": "http://placehold.it/32x32",
                  "useOnly": 18,
                  "name": "Tanya ",
                  "sellerName": "Tom",
                  "categoryName": "Horror",
                  "details": "Lynne ",
                  "location": "Dhaka",
                  "postedDate": 19
                },
                {
                  "originalPrice": "$489",
                  "resalePrice": "$379",
                  "rating": 5,
                  "categoryId": "637fab7fba4156c5fcd4ddcd",
                  "picture": "http://placehold.it/32x32",
                  "useOnly": 23,
                  "name": "Galloway ",
                  "sellerName": "john",
                  "categoryName": "Horror",
                  "details": "Rebecca ",
                  "location": "Mirpur",
                  "postedDate": 12
                },
                {
                  "originalPrice": "$328",
                  "resalePrice": "$260",
                  "rating": 4,
                  "categoryId": "637fab7fba4156c5fcd4ddcb",
                  "picture": "http://placehold.it/32x32",
                  "useOnly": 25,
                  "name": "Marcie ",
                  "sellerName": "jack",
                  "categoryName": "Action and adventure",
                  "details": "Nichole ",
                  "location": "khulna",
                  "postedDate": 15
                },
                {
                  "originalPrice": "$673",
                  "resalePrice": "$480",
                  "rating": 5,
                  "categoryId":"637fab7fba4156c5fcd4ddcb",
                  "picture": "http://placehold.it/32x32",
                  "useOnly": 24,
                  "name": "Elsie ",
                  "sellerName": "junaid",
                  "categoryName": "Action and adventure",
                  "details": "Marie ",
                  "location": "Borishal",
                  "postedDate": 16
                },
                {
                  "originalPrice": "$936",
                  "resalePrice": "$768",
                  "rating": 5,
                  "categoryId": "637fab7fba4156c5fcd4ddcc",
                  "picture": "http://placehold.it/32x32",
                  "useOnly": 19,
                  "name": "Wilkinson ",
                  "sellerName": "jems",
                  "categoryName": "Historical fiction",
                  "details": "Shelly ",
                  "location": "Nilkhet",
                  "postedDate": 10
                },
                {
                  "originalPrice": "$379",
                  "resalePrice": "$214",
                  "rating": 4,
                  "categoryId": "637fab7fba4156c5fcd4ddcc",
                  "picture": "http://placehold.it/32x32",
                  "useOnly": 23,
                  "name": "Arline ",
                  "sellerName": "Niloy",
                  "categoryName": "Historical fiction",
                  "details": "Solis ",
                  "location": "Manikganj",
                  "postedDate": 14
                }
              ]
            const result = await booksCollection.insertMany(docs)
            res.send(result)
        })

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