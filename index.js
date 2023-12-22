const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const {makeConnection}  = require('./connection/dbConnection')
const PORT = process.env.PORT 
require('./services/mongoService')
require('./services/movieServices')
const managementRoutes = require('./routes/routes')

makeConnection();

app.use(bodyParser.json());
bodyParser.json();

app.use(express.json());
app.use('/',managementRoutes);
app.get("/",(req,res) =>{
    res.send("Welcome to Assignment-155")
})

app.listen(PORT, () => {
    console.log(`Server is running for User-Management on port ${PORT}`);
  });
