const express = require('express')
const router = express.Router()

const {getFilms,getFilmById} = require('../controller/film')


router.get('/', getFilms);
router.get('/:id', getFilmById);



module.exports = router;


