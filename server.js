const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()


const app = express()


app.use(cors())
app.use(express.json())


mongoose.connect(`mongodb+srv://${process.env.ID}:${process.env.PW}@cluster0.fddnv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => {
    console.log('Connected successfully to MongoDB')
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error)
  })

// user Model
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

const User = mongoose.model('User', UserSchema)



// router for register
app.post('/api/users/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const user = new User({
      name,
      email,
      password 
    })

    await user.save()

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ message: 'Server error during registration' })
  }
})
//rounter for sign in

app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body

   
    const user = await User.findOne({ email })

    if (user && user.password === password) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        success: true
      })
    } else {
      res.status(401).json({ message: 'Invalid email or password' })
    }
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Server error during login' })
  }
})

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({}).select('-password')
    res.json(users)
  } catch (error) {
    console.error('Get all users error:', error)
    res.status(500).json({ message: 'Server error retrieving users' })
  }
})


app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({ message: 'Server error getting user' })
  }
})


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

// test route
app.get('/', (req, res) => {
  res.json({ message: 'API is running' })
})

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})