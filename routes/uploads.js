const express = require('express')
const router = express.Router()
const {uploadFileC,updateImage} = require('../controller/uploads');
const coleccion= ['productor','film','user']
const { validarCampos } = require('../middlewares/validate-fields')
const { check } = require('express-validator')


router.post('/',uploadFileC);
router.put('/:colection/:id',
[check('collection','No existe esa colección').isIn(coleccion),
check('id','El id no es valido').isMongoId(),
validarCampos], 
updateImage)



module.exports = router;
