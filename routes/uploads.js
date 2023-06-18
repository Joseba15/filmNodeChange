const express = require('express')
const router = express.Router()
const {uploadFileC,updateImage} = require('../controller/uploads');
const coleccion= ['productor','film','user']


router.post('',uploadFileC);
router.put('/:colection/:id',
[check('collection','No existe esa colección').isIn(coleccion),
check('id','El id no es valido').isMongoId(),
validateFields], updateImage)



module.exports = router;
