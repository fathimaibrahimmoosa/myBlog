const express=require('express')
const app=express()
const path=require('path')
const hbs=require('hbs')
const connectDB=require("./config/dbconfig")
const cookieParser=require('cookie-parser')
require('dotenv').config()


const user=require('./routes/user')
const admin=require('./routes/admin')

app.set('view-setEngine','hbs')
app.set("views",path.join(__dirname,"pages"))
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.json())
app.use('/',(req,res,next)=>
{
    res.set('Cache-Control','no-store')
    next()
})

connectDB()     
app.use('/',user)
app.use('/admin',admin)
app.listen(process.env.PORT);