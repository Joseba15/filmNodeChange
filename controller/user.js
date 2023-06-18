const {request, response} = require('express')
const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const { genJWT } = require('../helpers/genJWT')


const getUser = async (req = request,res= response) =>{
    const id = req.params.id;

    const user = await User.findById(id)
    if (user == null) {
        return res.status(400).json({
            msg : `User  doesnt exits`
        });
    }else{
        res.json({user})
    }

}

const getUsers= async(req,res) =>{
   
    const user = await User.find()
    res.json({user})
}

const updateUser = async (req = request, res = response) => {
    const id = req.params.id;

    const userFind = await User.findById(id);

    if(!userFind){
        return res.status(400).json({
            msg: 'Usuario no existe'
        });
    }else{
        const body= req.body;
        
        const salt = bcryptjs.genSaltSync();
        body.password = bcryptjs.hashSync( body.password, salt );
        const user = await User.findByIdAndUpdate(id,body)
    
        res.json(user)

    }

}

const delUser = async(req = request, res= response) => {
    const id = req.params.id;
    const user = await User.findById(id);

    if (user) {
        const userDelete = await User.findByIdAndRemove(id)
        res.json({userDelete})
        
    }else{
        return res.status(400).json({
            msg: 'Usuario no existe'
        });
    
    }
}


const signup = async(req, res) => {

    const { nombre, correo, password} = req.body;
    const rol = 'USER_ROLE'
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
    const user = await User.findOne({ "correo": correo })
    const validPassword = bcryptjs.compareSync(password, user.password)

    if(!user){
        res.status(400) .json( {mensage: 'El usuario no existe'})
    }else if(!validPassword){
        console.log(correo);
        return res.status(400).json({mensage: 'La contraseña no es correcta'})
    }else{
        const token = await genJWT(user._id);
        res.json({user,token})
    }   
}






module.exports = { signup,login,getUsers,updateUser,delUser,getUser }