const mongoose = require("mongoose")
const {Schema, model} = require("mongoose")

//Creo el nuevo esquema de usuario:
const userSchema = new Schema ({
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, lowercase: true, trim: true, unique: true},
    password:  {type: String, required: true}
}, {timestamps: true} //Para tener createdAt/UpdatedAt
);

const User = model("User", userSchema)
//Exporto el modelo para poder usarlo luego:
module.exports = User