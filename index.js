const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wiytl.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





async function run(){
        try{
            await client.connect();
            const jobsCollections = client.db('job_portal').collection('jobs');

            app.get('/jobs', async(req, res)=>{
                const query ={};
                const cursor = jobsCollections.find(query);
                const jobs = await cursor.toArray();
                res.send(jobs);
            })

           

        
            
        }
        finally{

        }
}

run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})