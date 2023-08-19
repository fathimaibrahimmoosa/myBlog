const mongoose=require("mongoose")
const userSchema=mongoose.Schema(
    {
        email:
        {
            type:String,
            required:true,
        },
        name:
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