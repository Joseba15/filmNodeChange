const express = require('express')
const router = express.Router()
const {signup,login,getUsers,updateUser,delUser,getUser} = require('../controller/user')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt')

router.get('/', getUsers);
router.get('/:id',[
    validateJWT,
    check('id','Tiene que ser un id valido').isMongoId(),
    validarCampos
],getUser)
router.post('/signup', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'Password must be between 6 and 12 characters').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    validarCampos
],signup );
router.post('/login', [
    check('password', 'la contraseña es requerida').not().isEmpty(),
    check('password', 'Password must be between 6 and 12 characters').isLength({ min: 6 }),
    check('correo', 'El correo es requerido').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    validarCampos
],login );
router.put('/:id', [
    validateJWT,
    check('id','Tiene que ser un id valido').isMongoId(),
    check('password', 'la contraseña es requerida').not().isEmpty(),
    check('password', 'Password must be between 6 and 12 characters').isLength({ min: 6 }),
    check('correo', 'El correo es requerido').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    validarCampos
],updateUser );

router.delete('/:id',[
    validateJWT,
    check('id','Tiene que ser un id valido').isMongoId(),
    validarCampos
],delUser)




module.exports = router