const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.port || 5000;





const uri = "mongodb+srv://susanto_chandra:susanto001@cluster0.uksn0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const run = async () => {
 try{
  await client.connect();

 
  const usersCollection = client.db("usersDB").collection("users");

  app.get('/users', async (req, res) => {
    const cursor = usersCollection.find()
    const result = await cursor.toArray()
    res.send(result)
  })

  //Get Users to server and Set User to Database
  app.post('/users', async (req, res) => {
    const user = req.body;
    console.log(user)
    const result = await usersCollection.insertOne(user);
    res.send(result)

  })

  app.delete('/users/:id', async(req, res) => {
    const id = req.params.id;
    console.log(id)
    const query = {_id: new ObjectId(id)}
    const result = await usersCollection.deleteOne(query)
    res.send(result)
  })

  await client.db("admin").command({ping: 1});
  console.log("Mongo-DB Connected!")
 }
 finally{
  // await client.close()
 }
}

// const run = () => {
//   client.connect();
//   client.db("admin").command({ping: 1});
//   console.log("Pinged your deployment. You successfully connected to MongoDB!")
// }



run().catch(console.log)






app.get('/', (req, res) => {
  res.send("Your App Successfully Run!")
})


app.listen(port, () => {
  console.log(`Your app is running at port ${port}`)
})