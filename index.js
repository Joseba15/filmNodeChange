const express = require('express');
const {dbConnection} = require('./database/config')
const app= express();
require('dotenv').config()

const film = require('./routes/film')

//MIDDLEWARE
app.use(express.json());

async function connectAtlas(){
    await dbConnection()
}
connectAtlas()


//ROUTES
app.use('/film', film)



app.listen(process.env.PORT);
console.log(`Server listening on port ${process.env.PORT}`);

