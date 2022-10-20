//Traigo path:
const path = require("path")
//Truco de console.log:
const { log } = require("console")
//Express configuration:
const express = require("express")
const app = express();
const PORT = 3000;
//Config mongo:
require("./configuration/mongo.js")

//-------------------------------------------------------

//Express handlebars config:
const hbs = require("express-handlebars")
//Setting app:
app.engine("hbs", hbs.engine({extname: 'hbs'}))
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "/views"))

//-------------------------------------------------------

//Defino carpeta public con la variable dirname:
app.use(express.static(path.join(__dirname, "/public")))
app.use(express.json()) //Para leer json
app.use(express.urlencoded({extended: true})) //Para leer la request del body.

//Defino variable local

//Defino express-session:
const session = require("express-session")
app.use(session({
    secret: process.env.secret_phrase,
    resave: false,
    saveUninitialized: true,
  }))

//Me traigo el middleware de auth:
const auth = require("./helpers/auth.js")
//Ruta home
app.get("/", (req, res) => {
    res.render("home", {user: req.session.user})
})

//Ruta usuarios:
app.use("/users", require("./routes/usuarioRoute.js"))

//Ruta templates: (Ruta para ver platillas, solo con auth)
app.get("/templates", auth, (req, res) => {
    res.render("templates", {user: `${req.session.user.name} ${req.session.user.lastName}`, id: req.session.user.id})
}) 

app.get("/notAuthorized", (req, res, next) => {
    res.render("notAuthorized")
})
 
app.listen(PORT, err => {
    !err  ? console.log('Server running on http//:localhost:3000') : console.log("¡There is an error, try later!");
})