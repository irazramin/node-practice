const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kjpmx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  await client.connect();
  const userCollection = client.db('practice2').collection('practiceUser2');
  try {
    app.get('/user', async (req, res) => {
      const query = {};

      const cursor = userCollection.find(query);
      const result = await cursor.toArray();

      res.send(result);
    });
  } finally {
  }
};

run().catch(console.dir)

app.listen(port, () => {
  console.log(`App listening from ${port}`);
});
