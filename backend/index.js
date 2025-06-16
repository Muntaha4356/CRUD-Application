require('dotenv').config()



const express =require('express')
const mongoose = require ('mongoose')
const user = require('./models/Users')
const cors = require('cors')
const Users = require('./models/Users')
const app= express()
app.use(cors())
app.use(express.json())
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>console.log("Connected to the database"))
.catch((err)=>console.error("There is an error ", err))

app.post('/createUsers', async (req, res)=>{
    try{
        const newUser = await Users.create(req.body);
        res.status(201).json(newUser);
    }catch(e){
        res.status(400).json({error: e.message})
    }
})

app.get('/getUsers', async (req, res)=> {
    try{
        const allUsers= await Users.find()
        res.status(200).json(allUsers);
    }catch(e){
        res.status(400).json({error: e.message})
    }
})
app.get('/getUser/:id', async(req, res)=>{
    try{
        const user_found = await Users.findById(req.params.id);
        if(!user_found){
            res.status(404).json({error: e.message})
        }
        res.status(200).json(user_found);
    }
    catch(e){
        res.status(400).json({ error: e.message });
    }
});
app.put('/updateUser/:id', async(req, res)=>{
    const userId= req.params.id;
    const updatedData= req.body;
    console.log(updatedData);
    try{
        const updatedUser = await Users.findByIdAndUpdate(userId, {
                name: req.body.name,
                email: req.body.email,
                age: req.body.age
            }, {new : true});
        if(!updatedUser){
            res.status(404).json({error: e.message})
        }
        res.status(200).json(updatedUser);

    }catch(e){
        res.status(400).json({ error: e.message });
    }
})

app.delete('/deleteUser/:id', async (req, res)=>{
    try{
        const deletedUser = await Users.findByIdAndDelete(req.params.id);
        if(!deletedUser){
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    }catch(e){
        res.status(400).json({error: e.message});
    }
})
app.listen(3000, ()=>{
    console.log("running");
})
