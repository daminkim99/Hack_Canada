const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();
const UserSchema = require('./models/User'); // Adjust the path as necessary
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

//const User = mongoose.model('User', UserSchema)
// Routes
app.post('/api/users/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' })
        }
        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            

        });
    } catch (error) {
        console.error('Registration error:', error)
        res.status(500).json({ message: 'Error registering new user', error });
    }
});

app.post('/api/users/login', passport.authenticate('local'), (req, res) => {

        // Use Passport's local strategy to authenticate the user
        passport.authenticate('local', (err, user, info) => {
          if (err) {
            console.error('Login error:', err);
            return res.status(500).json({ message: 'Server error during login' });
          }
          if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
          }
      
          // If authentication is successful, log the user in
          req.login(user, (err) => {
            if (err) {
              console.error('Session error:', err);
              return res.status(500).json({ message: 'Server error during session creation' });
            }
      
            // Return user details (excluding sensitive information like password)
            return res.json({
              _id: user._id,
              name: user.name,
              email: user.email,
              success: true,
            });
          });
        })(req, res, next);
    
});

app.get('/api/users', async (req, res) => {
    try {
      const users = await User.find({}).select('-password')
      res.json(users)
    } catch (error) {
      console.error('Get all users error:', error)
      res.status(500).json({ message: 'Server error retrieving users' })
    }
})


app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out', error: err });
        }
        res.json({ message: 'Logged out successfully' });
    });
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const { name, email } = req.body

    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.name = name || user.name
    user.email = email || user.email

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email
    })
  } catch (error) {
    console.error('Update user error:', error)
    res.status(500).json({ message: 'Server error updating user' })
  }
})

app.delete('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    await User.deleteOne({ _id: req.params.id })

    res.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Delete user error:', error)
    res.status(500).json({ message: 'Server error deleting user' })
  }
})

app.listen(6000, () => {
    console.log('Server running on port 6000');
});