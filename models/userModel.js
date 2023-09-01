const mongoose=require("mongoose")
const userSchema=mongoose.Schema(
    {
        fname:
        {
            type:String,
            required:true,
        },
        lname:
        {
            type:String,
            required:true,
        },
        email:
        {
            type:String,
            required:true,
        },
        password1:
        {
            type:String,
            required:true,
        },
        password2:
        {
            type:String,
            required:true,
        }
    }
)
const users=mongoose.model('users',userSchema);

module.exports={users}