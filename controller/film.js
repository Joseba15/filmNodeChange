const { response, request } = require('express');
const Film = require('../models/film');

const getFilms= async(req = request,res= response) =>{
    const film = await Film.find()
    res.json({film})
   
}

const getFilmById = async (req = request,res= response) =>{
    const id = req.params.id;

    const film = await Film.findById( id)
    // console.log('film',film);
    if (film == null) {
        return res.status(400).json({
            msg : `Film  doesnt exits`
        });
    }else{
        res.json({film})
    }

}

const addFilm = async(req, res) => {

    const { title, duration, country, genre,productor } = req.body;
    
    const film = new Film({ title, duration, country, genre,productor})
    const aux = await Film.findById(film.id)

    if (aux == null) {
        await film.save();
        res.json( airport)
        
    }else{
        return res.status(400).json({
            msg : `Film already exits`
        });
    }

}


const delFilm = async(req = request, res= response) => {
    const id = req.params.id;
    if (condition) {
        
    }
    const remove = await Film.findByIdAndRemove(id);
    res.json(remove)
}

module.exports = {getFilms,getFilmById,addFilm,delFilm}