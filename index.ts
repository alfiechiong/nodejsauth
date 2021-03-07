import express from 'express'
import {authToken, loginUser} from './modules'
 
const app = express()
const port = process.env.PORT || 8000
app.use(express.json());

app.get('/', (req,res)=>{
    res.send("Hello this is the root  page")
})
app.post('/generate-access-token', async (req,res)=>{

    console.log(req.body)
    const {username,password} = req.body
    const token = await loginUser({username,password})
    res.json(token)
    //res.send(username)
})
/* app.get('generate-secret', (req,res)=>{
    res.send(secret)
}) */

app.get('/userdata', authToken, (req,res)=>{
    res.send("successfully logged in")
})

app.get('/authToken', (req,res,next)=>{
   res.send(authToken(req,res,next))
})



app.listen(port, ()=>{
    console.log(`express is running on port ${port}`)
})
