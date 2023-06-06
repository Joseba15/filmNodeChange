const express = require('express')
const router = express.Router()
const { check } = require('express-validator')

const {addProductor,delProductor,getProductorById,getProductors,updateProductor} = require('../controller/productor')


router.get('/', getProductors);
router.get('/:id',[
    check('id','No es un id correcto').isMongoId(),
],getProductorById);

router.post('/', addProductor );

router.put('/:id',[
    check('id','No es un id correcto').isMongoId(),
], updateProductor );

router.delete('/:id', [
    check('id','No es un id correcto').isMongoId(),
],delProductor);

module.exports = router;


