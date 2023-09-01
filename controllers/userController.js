const mongoose=require("mongoose")
const USER=require('../models/userModel').users
const BLOGS=require('../models/blogSchema')
const jwt=require('jsonwebtoken')
const multer=require("multer");

const loginPage=((req,res)=>
{
    if(req.cookies.userJwt)
    {
        res.redirect('/home')
    }
    else
    {
        res.render('user/login.hbs')
    } 
})

const doLogin=(req,res)=>
{
    USER.find(
    {
        email:req.body.email,
        password1:req.body.password1
  
    }).then((response)=>
    {
        if(response.length > 0)
        {
            const token=jwt.sign({userId:response[0]._id},process.env.JWT_KEY,{expiresIn:'2d'})
            res.cookie('userJwt',token,
            {
                httponly:true,
                samSite:'lax',
                secure:false,
                maxAge:24*60*60*1000
            })

            res.status(200).json({login:true})
        }
        else
        {
            res.json({login:false})

        }
    })
}     
 
const showSignup=(req,res)=>
{
    res.render('user/signup.hbs')
}

const doSignUp=(req,res)=>
{
    console.log(req.body)
    USER(
    {
        fname:req.body.fname,
        lname:req.body.lname,
        email:req.body.email,
        password1:req.body.password1,
        password2:req.body.password2
    }).save().then((res)=>
    {
        res.json({signup:true})
    })
    .catch(()=> 
    {
        res.json({signup:false})
    })
}

const getHomePage=(req,res)=>
{
    BLOGS.find().then((response)=>
    {
        res.render('user/home.hbs',{data:response})

    })
    
}

const detailedView=(req,res)=>
{
    try
    {
        BLOGS.find({_id:req.query.id})
        .populate
        ({
            path:'createdBy',
            select:['fname','lname','email']
        })
        .then(response=>
        {
            //response[0].createdAt=new Date(response[0].createdAt)
            console.log(response)
            res.render('user/detailedView.hbs',{data:response[0]})
        })
        .catch(err=>
            {
                res.send('error')
            })
    }
    catch
    {
        res.send("Handled in catch")

    }

}

const logout=(req,res)=>
{
    res.cookie('userJwt',null,
    {
        httpOnly:true,
        samSite:'lax',
        secure:false,
        maxAge:1
    })
    req.cookies.userJwt=null
    res.redirect('/')
 }

 const createBlog=(req,res)=>
 {
    res.render('user/upload.hbs')
 }

 const addBlogData=(req,res)=>
 {
    const fileStorage=multer.diskStorage(
    {
        destination:(req, file, cb)=>
        {
            cb(null,"public/uploads");
        },
        filename:(req, files, cb)=>
        {
            cb(null,Date.now()+"-"+files.originalname)
        }

    })
    const upload=multer({storage:fileStorage}).array("images",6)
    upload(req,res,(err)=>
    {
            
        BLOGS(
        {
            heading:req.body.Category,
            content:req.body.content,
            images:req.files,
            createdBy:req.query.id
        }).save().then(response=>
            {
                res.redirect('/createBlog');

            })
    })
}


module.exports={doSignUp,loginPage,showSignup,doLogin,getHomePage,detailedView,logout,createBlog,addBlogData}