const {Router}= require('express')
const checkAuth = require('../../middlewares/authentication.middleware')
const route = Router()
const UserController = require('../../controllers/user.controller')

route.post('/api/forgot-password',UserController.forgotPassword)



module.exports = route