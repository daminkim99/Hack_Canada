const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();
const User = require('./models/User'); // Adjust the path as necessary
const passportConfig = require('./passportConfig'); // Adjust the path as necessary

const app = express();
app.use(cors());
app.use(express.json());

// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Connecting to the db
mongoose.connect(`mongodb+srv://${process.env.ID}:${process.env.PW}@cluster0.fddnv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(() => {
    console.log('Connected successfully');
}).catch((error) => {
    console.error("Error", error);
});

// Routes
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error registering new user', error });
    }
});

app.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ message: 'Logged in successfully', user: req.user });
});

app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out', error: err });
        }
        res.json({ message: 'Logged out successfully' });
    });
});

app.listen(6000, () => {
    console.log('Server running on port 6000');
});