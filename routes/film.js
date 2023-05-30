const express = require('express')
const router = express.Router()

const {getAirports,addAirport,delAirport,getAirportById,updateAirport} = require('../controllers/airport')


router.get('/', getAirports)
router.get('/:id', getAirportById)
router.post('/', addAirport)
router.delete('/:id', delAirport)
router.put('/:id', updateAirport)

