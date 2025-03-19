const valid = (req, res, next) =>{

  const { name, email, password, role } = req.body

  function validEmail (userEmail){
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail)
  }

  if(req.path === "/register"){
    if(![email, name, password, role].every(Boolean)){
      return res.status(401).json({message: "Missing Credentials"})
    } else if (!validEmail(email)){
      return res.status(401).json({message: "Invalid Email"})
    }
  } else if (req.path === "/login"){
    if(![email, password].every(Boolean)){
      return res.status(401).json({message: "Missing Credentials"})
    } else if (!validEmail(email)){
      return res.status(401).json({message: "Invalid Email"})
    }
  }
  next()
}

export default valid