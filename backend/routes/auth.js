const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt =require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = "NoobBoob$106"

// Route 1: Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
  body('name', 'Enter A  Valid Name').isLength({ min: 3 }),
  body('email', 'Enter A  Valid Email').isEmail(),
  body('password', 'Invalid Password').isLength({ min: 5 }),
], async (req, res) =>{
  let success = false;

  // if there are errors, req bad  and the erros
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    success = false
    return res.status(400).json({ success, errors: errors.array() });
  }

// check whether the same email exists?
try{

let user = await User.findOne({email: req.body.email})
if(user){
  return res.status(400).json({error: "Sorry A User With This Email Already Exists."})
}
const salt = await bcrypt.genSalt(10)
const secPass = await bcrypt.hash(req.body.password, salt)


//create User
   user = await User.create({
    name: req.body.name,
    password: secPass,
    email: req.body.email 
  })

  const data = {
  user:{
    id: user.id
  }

 }

   const authtoken = jwt.sign(data, JWT_SECRET)
   
    res.json({success,authtoken})

}catch(error){
  console.error("error.message")
  res.status(500).send("Some Error Ocurred!")
}

});

// Route 2: Authenticate User using: /api/auth/login
router.post('/login', [
  body('email', 'Enter A  Valid Email').isEmail(),
  body('password', 'Password Cannot Be Blank').exists(),
], async (req, res) =>{
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password } = req.body
  try{

    let user =  await User.findOne({email})
    if(!user){
      success = false
      return res.status(400).json({error: "Please Try To Login With Correct Credentials."})
    }
    const passwordCompare = await bcrypt.compare(password, user.password)
    if(!passwordCompare){
      success=false
      return res.status(400).json({success, error: "Please Try To Login With Correct Credentials."})

    }
    const data ={
      user:{
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET)
    success = true
    res.json({success, authtoken})

  }catch(error){
    console.error("error.message")
  res.status(500).send("Internal Server Error!")

  }



})

// Route 3: Get User Details with POST /api/auth/getuser
router.post('/getuser', fetchuser, async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error!");
  }
})


module.exports = router