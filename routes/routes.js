const {Router} = require('express')
const Controller = require('../controllers/Controller')
const authController=require('../controllers/authController')
const User = require('../models/user')
const authRoutes = require('../middleware/authmiddleware')

const router = Router()

router.get('/mesagges',authRoutes,Controller.mesagges)
router.get('/login',Controller.login)
router.get('/perdoruesit',authRoutes,Controller.perdoruesit)
router.get('/porosite',authRoutes,Controller.porosite)
router.get('/porositereja',authRoutes,Controller.porositereja)
router.get('/perdiri',authRoutes,Controller.perdiri)
router.get('/logout',Controller.logout)
router.post('/signin',authController.signin)
router.post('/register',authController.register)



module.exports=router