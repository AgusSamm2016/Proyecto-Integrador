const validator = require("express-validator") 
const { body, validationResult } = validator

const validationRules = [
    body("name")
    .notEmpty().withMessage({name1: "Mandatory field"}).isLength({min:2 , max: 30}).withMessage({name2: "at least 2 characters"}),
    body("lastName").notEmpty().withMessage({lastName1: "Mandatory field"}).isLength({min:2 , max: 30}).withMessage({lastName2: "at least 2 characters"}),
    body("email").notEmpty().withMessage({email1: "Mandatory field"}).isEmail().withMessage({email2: "Enter a valid email"}).trim(" "),
    body("pass").notEmpty().isLength({min: 8}).withMessage({pass1: "Password must contain above eight characters"})
, 
(req, res, next) => {

    const errors = validationResult(req)
        if(!errors.isEmpty()) { 
          //Creo un arreglo de errors para que directamente me muestre los errores:
          const arrWarnings = errors.array();
          const { name, lastName, email, pass } = req.body
          const formData = req.body;
          //Renderizo errores y formData para que me figure cuando recargo o envio formulario:
          res.render("registerForm", {arrWarnings, formData})
        } else return next()
    }
]

module.exports = validationRules