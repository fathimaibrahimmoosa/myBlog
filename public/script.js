
function doSignup()
{
    let formData={}
        formData.fname=document.getElementById("fname").value
        formData.lname=document.getElementById("lname").value
        formData.email=document.getElementById("email").value
        formData.password1=document.getElementById("password1").value
        formData.password2=document.getElementById("password2").value
        console.log(formData)
        fetch('/register',
        {
            method:"post",
            headers:
            {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(formData)
        })
        .then((response)=>response.json())
        .then((data)=>
        {
            window.location.href="/"
            //console.log(data);
        })
}
function doLogin()
{
    let loginData={}
    loginData.email=document.getElementById("email").value
    loginData.password1=document.getElementById("password1").value
    //console.log(loginData)
    fetch('/login',
    {
        method:"post",
        headers:
        {
            "Content-Type":"application/json"
        },
        body:JSON.stringify(loginData)
    })
    .then((response)=>response.json())
    .then(data=>
        {
            if(data.login)
            {
                window.location.href='/home'
            }
            else
            {
                document.getElementById('warning').innerHTML="Invalid username or password"
                setTimeout(()=>
                {
                    document.getElementById('warning').innerHTML="  "
                },3000)
            }
        })

}
const logout=()=>
{
    localStorage.clear()
    sessionStorage.clear()
    location.assign('/logout')
}

const showImages=()=>
{
    const imagesInput=document.getElementById('imageInput')
    const imagePreview=document.getElementById('imagePreview')
    document.getElementById('imagePreview').innerHTML=null
    const selectedImages=imagesInput.files
    for(let i=0;i<selectedImages.length;i++)
    {
        const image=document.createElement('img')
        image.src=URL.createObjectURL(selectedImages[i])
        image.style.width="150px";
        image.style.margin="3px";
        imagePreview.appendChild(image)
    }
}
