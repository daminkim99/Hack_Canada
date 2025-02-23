const express = require('express')
const mongoose = require ('mongoose')
const cors = require('cors')
require('dotenv').config()
const axios = require("axios");
const router = express.Router();



const app = express()
app.use(cors())
app.use(express.json())

//connecting to the db 
mongoose.connect(`mongodb+srv://elenanana0903:${process.env.PASSWORD}@cluster0.fddnv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then (()=> {
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

app.post('/restoList', async (req,res) => {
console.log("run")
//first step to reverse-geocode
let locations = req.body.locations; 
if (!Array.isArray(locations) || locations.length === 0) {
    return res.status(400).json({ error: "Invalid locations data" });
}
// Extract only lat and lon, ignoring other fields (e.g., name)
locations = locations.map(({ lat, lon }) => ({ lat, lon }));

try {
    // Use Axios to make multiple requests in parallel
    const results = await Promise.all(
        locations.map(({ lat, lon }) =>
            axios.get("https://nominatim.openstreetmap.org/reverse", {
                params: { lat, lon, format: "json" },
            })
            .then(response => ({
                lat,
                lon,
                address: response.data.display_name || "Address not found"
            }))
            .catch(error => ({
                lat,
                lon,
                address: "Error fetching address"
            }))
        )
    );
    console.log(results)
    //return the addresses only --> currently not working 
    res.json({ results });

    //if successful, compare if any of the response is in our database by address mathc 

} catch (error) {
    console.error("Error processing batch reverse geocode:", error);
    res.status(500).json({ error: "Internal Server Error" });
}
});

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