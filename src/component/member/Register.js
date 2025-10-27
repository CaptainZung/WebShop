

import { use, useState } from "react"
import API from "../../Config/api"
import Account from "./Account"

function Register(){
    const [input, setInput]= useState({
        name : "",
        email : "",
        password : "",
        phone : "",
        address : ""
    })
    

    const [error, setError] = useState([])
    const [getFile, setFile] = useState("")
    const [avatar, setAvatar] = useState("")
     const handleInput = (e)=>{
        const nameInput = e.target.name
        const valueInput = e.target.value
        setInput(state =>({...state,[nameInput]:valueInput}))
     }
    function handleSubmit(e){
        e.preventDefault()
        let errorSubmit = {}
        let flag = true
        if(input.name === ""){
            errorSubmit.name = "vui long nhap ten"
            flag = false
        }
        if(input.email === ""){
            errorSubmit.email = "vui long nhap email"
            flag = false
        }
        if(input.password === ""){
            errorSubmit.password = "vui long nhap password"
            flag = false
        }
        if(input.phone === ""){
            errorSubmit.phone = "vui long nhap so dien thoai"
            flag = false
        }
        if(input.address === ""){
            errorSubmit.address = "vui long nhap dia chi"
            flag = false
        }
        if(getFile === ""){
      errorSubmit.file = "them anh vao"
      flag = false
    }else{
                // console.log(getFile)
                let getSize = getFile[0]['size'];
                if(getSize > 1024 *1024){
                     errorSubmit.avatar = "anh ko dung size";
                     flag= false
                }else {
                    let array1 = [ "png", "jpg", "jpeg","PNG","JPG"]
                    let getName = getFile[0]['name']
                    let tenanh = getName.split(".");
                    // console.log(tenanh[0])
                    if(array1.includes(tenanh[1])){
                    }else {
                        errorSubmit.avatar ="file khong dung dinh dang"
                        flag= false
                    }

                }
          }
        if(!flag){
            setError(errorSubmit)
        }else{
            setError({})
            const user = {
                name : input.name,
                email : input.email,
                password : input.password,
                phone : input.phone,
                address : input.address,
                avatar : avatar,
                level : 0
            }
            API.post("/register",user)
            .then(res =>{
                console.log(res)
                if(res.data.errors){
                    setError(res.data.errors)
                }else{
                alert("Dang ki thanh cong")
                }
            })
            .catch(err =>{
                console.log(err)

            })

        }
    }
    function handleFile(e){
    const file = e.target.files;
    let reader = new FileReader();
    reader.onload = (e)=>{
      setAvatar(e.target.result)
      setFile(file)
    }
    reader.readAsDataURL(file[0])
  }
      function renderError(){
        if(Object.keys(error).length > 0){
            return Object.keys(error).map((key,index)=>{
                return (
                    <li key={index}>{error[key]}</li>
                )
            })
        }
    }
    return (
        <div className="signup-form">{/*sign up form*/}
                <h2>New User Signup!</h2>
                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                {renderError()}
                  <input type="text" placeholder="Name" name="name" onChange={handleInput}/>
                  <input type="email" placeholder="Email Address" name="email" onChange={handleInput}/>
                  <input type="password" placeholder="Password" name="password" onChange={handleInput}/>
                  <input type="tel" placeholder="Phone" name="phone" onChange={handleInput}/>
                  <input type="text" placeholder="Address" name="address" onChange={handleInput}/>
                   <input type="file" name="file" onChange={handleFile}/>
                  <button type="submit" className="btn btn-default">Signup</button>
                </form>
              </div>
    )
}
export default Register