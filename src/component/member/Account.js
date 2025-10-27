import { useEffect, useState } from "react"
import API from "../../Config/api"
function Account (){
        let info = localStorage.getItem("data")
        info = JSON.parse(info)
        console.log(info)
        const handleInput = (e) =>{
        const nameInput = e.target.name
        const valueInput = e.target.value
        setUser(state =>({...state,[nameInput]:valueInput}))
    }
    const [getFile, setFile] = useState("")
    const [avatar, setAvatar] = useState("")
    const [error, setError] = useState({})
    const [user, setUser] = useState({
        id :"",
        name : "",
        email : "",
        password : "",
        phone : "",
        address : "",

    })
    function handleSubmit(e){
        e.preventDefault()
        let errorSubmit = {}
        let flag = true
        if(user.name === ""){
            errorSubmit.name = "vui long nhap ten"
            flag = false
        }
        if(user.email === ""){
            errorSubmit.email = "vui long nhap email"
            flag = false
        }
        if(user.password === ""){
            errorSubmit.password = "vui long nhap password"
            flag = false
        }
        if(user.phone === ""){
            errorSubmit.phone = "vui long nhap so dien thoai"
            flag = false
        }
        if(user.address === ""){
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
            let config = {
        headers: {
          'Authorization': 'Bearer ' + user.token,
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
      };
            const formData = new FormData();
            formData.append('name',user.name)
            formData.append('email',user.email)
            formData.append('password',user.password)
            formData.append('phone',user.phone)
            formData.append('address',user.address)
            formData.append('avatar',getFile[0])
            formData.append('level',0)

            API.post("user/update/" + user.id,formData, config)
            .then(res =>{
                console.log(res)
                if(res.data.errors){
                    setError(res.data.errors)
                }else{
                alert("Cap nhat thanh cong")
                localStorage.setItem("data",JSON.stringify(res))
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
    useEffect(()=>{
        let userData = localStorage.getItem("data")
        if(userData){
            userData = JSON.parse(userData);
            userData = userData.data
            console.log(userData)

            setUser({
                id: userData.Auth.id,
                name : userData.Auth.name,
                email : userData.Auth.email,
                address : userData.Auth.address,
                phone : userData.Auth.phone,
                token : userData.token
            })
        }
    },[])
    return (
                <div className="col-sm-9">
                    {renderError()}
              <div className="blog-post-area">
                <h2 className="title text-center">Update user</h2>
                <div className="signup-form">{/*sign up form*/}
                  <h2>Update</h2>
                  <form onSubmit={handleSubmit} >
                  <input type="text" placeholder="Name" value={user.name} name="name" onChange={handleInput}/>
                  <input type="email"  readOnly placeholder="Email Address" name="email" value={user.email} onChange={handleInput}/>
                  <input type="tel" placeholder="Phone" value={user.phone} name="phone" onChange={handleInput}/>
                  <input type="text" placeholder="Address" value={user.address} name="address" onChange={handleInput}/>
                   <input type="file" name="file" onChange={handleFile} />
                    <button type="submit" className="btn btn-default">Signup</button>
                  </form>
                </div>
              </div>
            </div>
    )
    }

export default Account