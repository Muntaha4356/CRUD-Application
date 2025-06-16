const mongoose =require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: String
})



const userModel = mongoose.model("users", UserSchema)

module.exports= userModel

