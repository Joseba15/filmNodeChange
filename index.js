const express = require('express');
const {dbConnection} = require('./database/config')
const app= express();
require('dotenv').config()

const film = require('./routes/film')
const productor = require('./routes/productor')
const user = require('./routes/user')
const file = require('./routes/uploads')


//MIDDLEWARE
app.use(express.json());

async function connectAtlas(){
    await dbConnection()
}
connectAtlas()


//ROUTES
app.use('/film', film)
app.use('/productor', productor)
app.use('/user', user)
app.use('/file',file)

app.listen(process.env.PORT);
console.log(`Server listening on port ${process.env.PORT}`);

