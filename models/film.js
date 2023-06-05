const { Schema, model } = require('mongoose');

const FilmSchema = Schema({
 
    title: {
        type: String,
        required: [true, 'El titulo es obligatoria'],       
    },
    duration:{
        type:Number,
        required: [true, 'La duracion es obligatoria'],
    },
    country: {
        type: String,
        required: [true, 'El pais es obligatorio'],
    },
    genre: {
        type: String,
        required: [true, 'El genero es obligatorio'],
    },
    productores:{
        type:Schema.Types.ObjectId,
        ref: 'Productor',
        required: true  
    },
});

module.exports = model( 'Film', FilmSchema );
