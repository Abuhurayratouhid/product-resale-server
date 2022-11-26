const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ObjectId } = require('mongodb');
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


// verify JWT 
function verifyJWT(req, res, next){
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).send({message: 'unAuthorized access'})
    }
    const token = authHeader.split(' ')[1];
}
async function run() {
    try {
        const booksDB = client.db('booksDB');
        const categoriesCollection = booksDB.collection('categoriesCollection');
        const booksCollection = booksDB.collection('booksCollection');
        const ordersCollection = booksDB.collection('ordersCollection');
        const usersCollection = booksDB.collection('usersCollection');

        // JWT  
        app.get('/jwt',async(req, res)=>{
            const email = req.query.email;
            const query = {email: email};
            const user = await usersCollection.findOne(query)
            if(user){
                const token = jwt.sign({email},process.env.ACCESS_TOKEN,{expiresIn:'1d'})
                return res.send({accessToken: token})
            }
            res.status(403).send({accessToken: ''})
            // console.log(user)
        })
        // get only sellers 
        app.get('/sellers', async(req, res)=>{
            const query = {account: 'Seller'};
            const result = await usersCollection.find(query).toArray();
            res.send(result)
        })
        // get only Buyers 
        app.get('/buyers', async(req, res)=>{
            const query = {account: 'Buyer'};
            const result = await usersCollection.find(query).toArray();
            res.send(result)
        })

        // delete a buyer
        app.delete('/buyer/:id',async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const result = await usersCollection.deleteOne(query);
            res.send(result)
            // console.log(id)

        })
        // delete a seller
        app.delete('/seller/:id',async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const result = await usersCollection.deleteOne(query);
            res.send(result)
            // console.log(id)

        })

        // get all users from DB 
        app.get('/users', async(req, res)=>{
            const query = {}
            const result = await usersCollection.find(query).toArray();
            res.send(result)
        })
        // get all Orders from DB 
        app.get('/orders', async(req, res)=>{
            const query = {}
            const result = await ordersCollection.find(query).toArray();
            res.send(result)
        })

        // save user in DB 
        app.post('/users', async(req, res)=>{
            const user = req.body;
            const result = await usersCollection.insertOne(user)
            console.log(result)
        })

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