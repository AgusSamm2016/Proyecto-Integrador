//Traigo configuración de pass y el modelo de usuario:
const password = require("../helpers/password.js")
const User = require("../schemas/usuarioSchema.js")
//Traigo método where de schema:
const { $where } = require("../schemas/usuarioSchema.js")

//Traigo transporte y validationRules:
const transport = require("../helpers/nodemailer.js")
const validationRules = require("../validations/validationRules.js")


//controladores de rutas:
function getLoginForm (req, res, next) {
 res.render("loginForm")
}

async function sendLoginForm (req, res, next) {
    
    const {email, pass} = req.body //Desestructuramos el form
    const user = await User.find().where({email: email}) //Buscamos en la DataBase

    //Pregunto si viene vacio
    if(!user.length) {
        return res.render("loginForm", {message: "Data is not correct. Try again."})
    }
   
    //Si no esta vacio comparo contraseñas:
     if(await password.decryptFunction(pass, user[0].password)) {
      //Creamos para sesión abierta
        const usr = { 
         id: user[0]._id,
         name: user[0].name,
         lastName: user[0].lastName  
         }
      //Sesión de usuario:
      req.session.user = usr
      res.render("templates",{user: `${ req.session.user.name} ${req.session.user.lastName} `, id: req.session.user.id})
     } else {
        return res.render("loginForm", {message: "Data is not correct. Try again"})
     }
   
}

function getRegisterForm (req, res, next) {
    res.render("registerForm")
}


async function sendRegisterForm (req, res, next) {
 const {name, lastName, email, pass} = req.body   //Desestructuramos form
 const securePass = await password.encryptFunction(pass) //Creamos contra segura
 const newUser = new User ({ //Creamos nuevo usuario
   name: name, lastName: lastName, email:email, password: securePass
 })
 //Creamos variable de usuario para sesion abierta:
 const usr = {
    id: newUser._id,
    name: newUser.name,
    lastName: newUser.lastName
   }  

//Config email de registro
newUser.save ((err) => {
 if(!err) {
    req.session.user = usr
    res.render("templates", {user: `${ req.session.user.name} , ${ req.session.user.lastName} `, id: req.session.user.id}) 
 } else {
    res.render("registerForm" , {message: "There is already a record with that email"})
 }})
}//Fin sendRegisterForm

async function getSettings (req, res, next) {
   const user = await User.findById(req.session.user.id).lean() //El usuario que esta logueado lo buscamos en base de datos mediante el método findById:
   res.render("settings", {user})
}

async function sendSettings (req, res, next) {
const {name, lastName, email} = req.body //Desestructuramos el body
  try {
   await User.findByIdAndUpdate(req.session.user.id, req.body)
   res.render("templates")
  } catch (error) {
   res.render("settings", {message: "Cannot complete your request, try later."})
  }
}

async function deleteUser (req, res) {
   try  {
   //Como hicimos anteriormente en sendSettings, await y utilizamos el método findByIdandDelete:
   await User.findByIdAndDelete(req.session.user.id)
   req.session.destroy()
   res.render("home", {message: "The data has been destroyed correctly"})
   } catch (error) {
   res.render("settings", {message: "Cannot complete your request, try later."})
   }
       
}

function logout(req, res, next) {
   req.session.destroy()
   res.redirect("/")
}

module.exports = {getLoginForm, sendLoginForm, getRegisterForm, sendRegisterForm, getSettings, sendSettings, deleteUser, logout}


