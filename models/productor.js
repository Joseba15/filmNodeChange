const { Schema, model } = require('mongoose');

const ProductorSchema = Schema({
   
    name: {
        type: String,
        required: [true, 'El nombre del productor es obligatoria'],       
    },
    address: {
        type: String,
        required: [true, 'La direccion es obligatoria'],
    },
    
});

module.exports = model( 'Productor', ProductorSchema )
