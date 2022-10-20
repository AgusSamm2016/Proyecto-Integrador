//Traigo el router:
const router = require("express").Router()
const  { Router } = require("express")
//Engancho controller:
const {getLoginForm, sendLoginForm, getRegisterForm, sendRegisterForm, logout, getSettings, sendSettings, deleteUser} = require("../controllers/usuarioController")
//Traigo el middleware
const validationRules = require("../validations/validationRules.js")
const auth = require("../helpers/auth.js")

router.get("/login", getLoginForm) 
router.post("/login", sendLoginForm) 
router.get("/register", getRegisterForm)
router.post("/register", validationRules, sendRegisterForm)
router.get("/logout", logout)
router.get("/settings", auth,  getSettings )
router.post("/settings", auth, sendSettings)
router.get("/delete", auth, deleteUser)

//Exporto enrutador:
module.exports = router