
function doSignup()
{
    let formData={}
        formData.name=document.getElementById("name").value
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
    loginData.name=document.getElementById("name").value
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
            //console.log(data);
        })

}
const logout=()=>
{
    localStorage.clear()
    sessionStorage.clear()
    location.assign('/logout')
}
