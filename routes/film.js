const express = require('express')
const router = express.Router()
const { check } = require('express-validator')


const {getFilms,getFilmById,addFilm,delFilm,updateFilm} = require('../controller/film')


router.get('/', getFilms);
router.get('/:id',[
    check('id','No es un id correcto').isMongoId(),
],getFilmById);

router.post('/', addFilm );

router.put('/:id',[
    check('id','No es un id correcto').isMongoId(),
], updateFilm );

router.delete('/:id', [
    check('id','No es un id correcto').isMongoId(),
],delFilm);

module.exports = router;


