const {randomBytes} =require('node:crypto')

module.exports =  async function RandomPassword() {
    try {
        let r1 = await randomBytes(6).toString('hex')
        
        return r1
    } catch (error) {
        return false
    }
}