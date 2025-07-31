import express from "express"
import User from "../models/user-model.js"
const router = express.Router()
import jwt from 'jsonwebtoken'

// Register a new user
router.post("/register", async (req, res) => {
    const { email, password, name } = req.body

    // for checking data recieved in terminal
    // console.log("Received body:", req.body);
    
    
    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" })
    }

    try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" })
    }

    const newUser = new User({ email, password, name }) // No hashing yet
    await newUser.save()

    res.status(201).json({ message: "User registered successfully" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to register user" })
  }
})

// POST /userroutes/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { name: user.name, email: user.email },
      process.env.JWT_SECRET
    )

    // we can add JWT/token logic later here
    res.status(200).json({ message: 'Login successful',token,  user: { name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


export default router
