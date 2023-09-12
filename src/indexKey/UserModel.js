const User = require('../models/user.model')

User.createIndexes({
    username:1,
    email:1
})

module.exports = User