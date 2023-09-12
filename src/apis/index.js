//admin
const userRoute = require('./admin/user')
// const customerRoute = require('./fe/customer')



function api(app) {
app.use('/',userRoute)
// app.use('/',customerRoute)
}

module.exports = api