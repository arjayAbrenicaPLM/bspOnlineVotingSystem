import jwt from 'jsonwebtoken'
import env from 'dotenv'

env.config()

const authorize = async (req, res, next) => {
  try {
    const jwtToken = req.header("token")

    if(!jwtToken){
      return res.status(403).json({message: "User Unauthorized"})
    }

    const payload = jwt.verify(jwtToken, process.env.jwtSecret)

    req.user = payload.user

    next()

  } catch (error) {
    console.log(error.message)
    return res.status(403).json({message: "User Unauthorized", error: error.message})
  }
}

export default authorize