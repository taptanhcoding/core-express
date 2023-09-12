const {Router}= require('express')
const checkAuth = require('../../middlewares/authentication.middleware')
const route = Router()
const UserController = require('../../controllers/user.controller')

route.post('/api/admin/login',UserController.login)
route.post('/api/admin/register',UserController.register)



module.exports = route