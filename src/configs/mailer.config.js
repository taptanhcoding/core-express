const pathRoot = require('app-root-path').path
const path = require('path')
module.exports = {
    activeMail: {
        subject: "Kích hoạt tài khoản",
        htmlLink: path.join(pathRoot,'src','htmlTemplate','mailActiveCustomer.html')
    },
    accessCart: {
        subject: "Thông tin đơn hàng",
        htmlLink: path.join(pathRoot,'src','htmlTemplate','accessCart.html')

    },
    forgotpassword: {
        subject: "Quên mật khẩu",
        htmlLink: path.join(pathRoot,'src','htmlTemplate','forgotpassword.html')

    }
}