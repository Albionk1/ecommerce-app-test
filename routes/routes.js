const { Router } = require('express')
const Controller = require('../controllers/Controller')
const authController = require('../controllers/authController')
const multer = require('multer')



const authRoutes = require('../middleware/authmiddleware')
const checkUser = require('../middleware/usermiddleware')


const router = Router()

const upload = multer({
   limits: {
      fileSize: 1000000,
   },
   fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
         return cb(new Error("Allowed only: 'jpg', 'jpeg' and 'png'"))
      }
      cb(undefined, true)
   },
})

router.get('*', checkUser)
router.get('/', authRoutes, Controller.dashboard)
router.get('/mesagges', authRoutes, Controller.mesagges)
router.get('/login', Controller.login)
router.get('/perdoruesit', authRoutes, Controller.perdoruesit)
router.get('/porosite', authRoutes, Controller.porosite)
router.get('/porositereja', authRoutes, authController.porositereja)
router.get('/perdiri', authRoutes, Controller.perdiri)
router.get('/logout', Controller.logout)
router.post('/neworder', authRoutes, authController.neworder)
router.get('/neworder', Controller.neworderG)
router.get('/ofertat', Controller.ofertat)
router.post('/signin', authController.signin)
router.post('/addPhoto', upload.single('image'), authController.addPhoto)
router.get('/image', authController.image)
router.post('/register', authController.register)




module.exports = router