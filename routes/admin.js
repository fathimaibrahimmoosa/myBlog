const express=require('express')
const routes=express.Router()
const {uploadPage,createBlog}=require('../controllers/adminController')

routes.get('/',(req,res)=>
{
    res.send("Hai This is admin")
})

routes.get('/uploads',uploadPage)

routes.post('/createBlog',createBlog)


module.exports=routes