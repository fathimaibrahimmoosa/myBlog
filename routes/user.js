const express=require('express')
const { doLogin,doSignUp,loginPage,showSignup,getHomePage,detailedView,logout,createBlog,addBlogData} = require('../controllers/userController')
const  routes=express.Router()
const userAuth=require('../middlewares/userAuth')

routes.get('/',loginPage)
routes.get('/signup',showSignup)
routes.post('/register',doSignUp)
routes.post('/login',doLogin)
routes.get('/home',userAuth,getHomePage)
routes.get('/detailedView',userAuth,detailedView)
routes.get('/logout',logout)
routes.get('/createBlog',userAuth,createBlog)
routes.post('/createBlog',userAuth,addBlogData)

module.exports=routes