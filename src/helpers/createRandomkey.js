const {randomBytes} =require('node:crypto')

module.exports =  async function createRandomkey(number) {
    try {
        let r1 = await randomBytes(number).toString('hex')
        console.log({
            r1
        });
    } catch (error) {
        
    }
}