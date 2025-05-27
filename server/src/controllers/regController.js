import * as regServices from '../services/regServices.js'
import jwtGenerator  from '../services/jwtGenerator.js'
import bcrypt from 'bcrypt'

// Register user
export const regUser = async (req, res) => {
  try {
    const { name, email, password, role, region } = req.body

    // Check if user exists
    const doesExist = await regServices.checkExists(email)

    // Notify if user exists
    if (doesExist != 0){
      return res.status(401).json({message: "User Already Exists. Try a different email"})
    }
    
    // Encrypt password
    const saltRound = 10
    const salt = await bcrypt.genSalt(saltRound)
    const bcryptPassword = await bcrypt.hash(password, salt)

    // Register new user
    const register = await regServices.registerUser(name, email, bcryptPassword, role, region)
    const uid = register[0].user_id

    if (role === "Voting Delegate"){
      try {
        const voter = await regServices.addVoter(name, uid, null)
      } catch (error) {
        return res.status(500).json({message: "Error Adding Voter", error: error.message})
      }
    }

    // Create user token
    const token = jwtGenerator(register[0].user_id)

    return res.status(201).json({message: "User Added", token: token})
  } catch (error) {
    return res.status(500).json({message: "Server Error", error: error.message})
  }
}

// Login
export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body
    // Check if user exists
    const doesExist = await regServices.checkExists(email)

    // Notify if user does not exist
    if (doesExist == 0){
      return res.status(401).json({message: "User does not Exist"})
    }

    // Check if password is the same
    const validPassword = await bcrypt.compare(password, doesExist[0].user_password)
    
    if(!validPassword){
      return res.status(401).json({message: "Password or Email is incorrect"})
    }

    // Create user token
    const token = jwtGenerator(doesExist[0].user_id)
    
    return res.status(201).json({message: "Login Succesful", token: token, role: doesExist[0].user_role})
  } catch (error) {
    return res.status(500).json({message: "Server Error", error: error.message})
  }
}

// Authorize user
export const isVerify = async (req, res) => {
  try {
    return res.json(true)
  } catch (error) {
    return res.status(500).json({message: "Server Error", error: error.message})
  }
}

export const changePassword = async (req, res) => {
  try {
    const { oldPass, newPass, confirmPass } = req.body
    const dbPass = await regServices.getPassword(req.user)

    const validPassword = await bcrypt.compare(oldPass, dbPass[0].user_password)

    if(!validPassword){
      return res.status(401).json({message: "Old Password is Incorrect"})
    }

    if (newPass == oldPass){
      return res.status(401).json({message: "New Password can not be same as Old Password"})
    }

    if (newPass !== confirmPass){
      return res.status(401).json({message: "New Password and Confirmation Password do not Match"})
    }

    // Encrypt password
    const saltRound = 10
    const salt = await bcrypt.genSalt(saltRound)
    const bcryptPassword = await bcrypt.hash(newPass, salt)
     
    const result = await regServices.changePassword(bcryptPassword, req.user)

    return res.status(201).json({message: "Changed Password Succesfully"})
  } catch (error) {
    return res.status(500).json({message: "Server Error", error: error.message})
  }
}