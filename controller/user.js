const {request, response} = require('express')
const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const { genJWT } = require('../helpers/genJWT')

const getUsers= async(req,res) =>{
    const { limit=5, skip=0} = req.query;
    const users = await User.find({state: true}).limit(Number(limit)).skip(Number(skip))
    res.json({ limit, skip, users})
}

const signup = async(req, res) => {

    const { nombre, correo, password, rol} = req.body;
    const user = new User({nombre, correo, password, rol})
    
    const existeEmail = await User.findOne({correo});
        if (existeEmail){
            return res.status(400).json({
                msg: 'El correo ya está registrado'
            });
        }

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );


    
    await user.save();

    res.json(
        user
    )

}

 const login = async(req=request, res=response) =>{
    const { correo, password} = req.body
    const user = await User.findOne(correo)
    const validPassword = bcryptjs.compareSync(password, user.password) 

    if(!user){
        res.status(400) .json( {mensage: 'El usuario no existe'})
    if(!validPassword){
        return res.status(400).json({mensage: 'La contraseña no es correcta'})
    }else{
        const token = await genJWT(user._id);
        res.json({user,token})
    }   
}
}



module.exports = { signup,login,getUsers }