require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')

const server = express()

server.use(cors())
server.use(express.json())
server.use(router)

const PORT = process.env.PORT || 4000

server.listen(PORT,()=>{
    console.log(`Server started at : ${PORT}`);
})

server.get('/',(req,res)=>{
    res.status(200).json("Server Started")
})