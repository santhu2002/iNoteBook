const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser")

const JWT_SCERET = "santhu2002";

// Route 2:Create a User using :POST "/api/auth/createuser" . Doesn't require authentication, No login required 
router.post('/createuser', [
  body('email', 'enter a valid email').isEmail(),
  body('password', 'enter password atleast 5 characters').isLength({ min: 5 }),
  body('name', 'enter a valid name').isLength({ min: 3 }),
], async (req, res) => {
  //if there are any errors ,return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //check Wheather the user with this email exists already
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "Sorry a user with this email already exist" })
    }

    //creating a password by adding salt(using bcryptjs)
    const salt = await bcrypt.genSaltSync(10);
    const secpass = await bcrypt.hash(req.body.password, salt);

    //to create a user in database
    user = await User.create({
      name: req.body.name,
      password: secpass,
      email: req.body.email,
    });

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SCERET);

    //res.json(user);
    res.json({ authtoken });

    //catch errors
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error occured")

  }
})


// Route 2:Authenticate a User using :POST "/api/auth/login" . Doesn't require authentication, No login required 
router.post('/login', [
  body('email', 'enter a valid email').isEmail(),
  body('password', 'password cannot be blank').exists(),
], async (req, res) => {
  //if there are any errors ,return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: "please enter correct credentials" });
    }
    const passwordcompare = await bcrypt.compare(password, user.password)
    if(!passwordcompare){
      return res.status(400).json({ errors: "please enter correct credentials" });
    };

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SCERET);

    //res.json(user);
    res.json({ authtoken });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error occured")

  }


});

// Route 3: Get user logged in details using Post: "/api/auth/getuser" login required
router.post('/getuser',fetchuser, async (req, res) => {
try {
  const userId=req.user.id
  const user= await User.findById(userId).select("-password");
  res.send(user);
}catch (error) {
  console.error(error.message);
  res.status(500).send("internal server error occured")
}
})




module.exports = router