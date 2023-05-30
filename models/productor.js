const { Schema, model } = require('mongoose');

const ProductorSchema = Schema({
    id: {
        type: Number,
        required: [true, 'El codigo es obligatorio'],
        unique: true
    },
    name: {
        type: String,
        required: [true, 'El nombre del productor es obligatoria'],       
    },
    address: {
        type: String,
        required: [true, 'La direccion es obligatoria'],
    }
});

module.exports = model( 'Productor', ProductorSchema )
