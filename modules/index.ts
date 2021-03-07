import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import authenticate from './auth'
dotenv.config()

const verifyToken = ((token:string, req:any, res:any, next:()=>void) =>{
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err:any, user:any) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        next() // pass the execution off to whatever request the client intended
      })
})

export const authToken = ((req:any, res:any, next:()=>void) =>{
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401) // if there isn't any token
    verifyToken(token, req, res, next)  
  }
)

export const secret = console.log(require('crypto').randomBytes(64).toString('hex'))

const generateAccessToken = (loginData:{username:string, password:string})=>{
  return jwt.sign(loginData, process.env.SECRET_KEY as string,{expiresIn:'1800s'})
}

export const loginUser = async (loginData:{username:string,password:string})=>{
  const authenticated = await authenticate(loginData.username, loginData.password)
  if(authenticated){
    return generateAccessToken(loginData)
  }else{
    return "wrong email or password error"
  }
}