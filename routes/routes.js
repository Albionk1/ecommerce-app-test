const {Router} = require('express')
const Controller = require('../controllers/Controller')
const authController=require('../controllers/authController')
const User = require('../models/user')

const router = Router()

router.get('/mesagges',Controller.mesagges)
router.get('/login',Controller.login)
router.get('/perdoruesit',Controller.perdoruesit)
router.get('/porosite',Controller.porosite)
router.get('/porositereja',Controller.porositereja)
router.get('/perdiri',Controller.perdiri)
router.post('/signin',authController.signin)
router.post('/register',authController.register)



module.exports=router