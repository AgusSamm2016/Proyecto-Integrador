const bcrypt = require("bcrypt")
//Defino la aleatoriedad de la encriptación
const saltRounds = 10

//Método para encriptar:
const encryptFunction = async (password) => {
    //Método hash
    const encryptedPass = await bcrypt.hash(password, saltRounds)
    return encryptedPass
}

//Método para desencriptar:
const decryptFunction = async(password, encryptedPass) => {
    //Método compare
    return await bcrypt.compare(password, encryptedPass)
}


//Exporto:
module.exports = {encryptFunction, decryptFunction}