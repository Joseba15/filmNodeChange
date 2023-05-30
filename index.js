const express = require('express');
const {dbConnection} = require('./database/config')
const app= express();
require('dotenv').config()




app.use(express.json());

async function connectAtlas(){
    await dbConnection()
}
connectAtlas()





app.listen(process.env.PORT);
console.log(`Server listening on port ${process.env.PORT}`);

