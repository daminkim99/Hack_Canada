const express = require('express')
const mongoose = require ('mongoose')
const cors = require('cors')
require('dotenv').config()


const app = express()
app.use(cors())
app.use(express.json())



//connecting to the db 
mongoose.connect(`mongodb+srv://${process.env.ID}:${process.env.PW}@cluster0.fddnv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then (()=> {
    console.log('connected successfully')
}).catch((error) => {
    console.error("error", error)
})

//creating a schema 

const UserSchema = new mongoose.Schema({ 
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
})

const User = mongoose.model('User', UserSchema)

//routes 

app.post('/', async (req, res) => {

    try {
        // Manually define test data
        const testData = {
            name: "John Doe",
            email: "johndoe@example.com",
            password: "23432", 
        };

        // Create and save booking in MongoDB
        const newUser = new User(testData);
        await newUser.save();

        console.log("Test Booking Saved:", newUser);
        res.json(newUser);

    } catch (error) {
        console.error("Error saving test booking:", error);
        res.status(500).json({ message: "Error saving test booking" });
    }
});


app.listen(6000, ()=> {
    console.log('Server running on port 6000')
})