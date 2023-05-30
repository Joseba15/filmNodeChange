const { response, request } = require('express');
const Film = require('../models/film');

const getFilms= async(req = request,res= response) =>{
    const film = await Film.find()
    res.json({film})
   
}

const getFilmById = async (req = request,res= response) =>{
    const id = req.params.id;

    const film = await Film.findById( id)
    console.log('film',film);
    if (film == null) {
        return res.status(400).json({
            msg : `Film  doesnt exits`
        });
    }else{
        res.json({film})
    }

}

module.exports = {getFilms,getFilmById}