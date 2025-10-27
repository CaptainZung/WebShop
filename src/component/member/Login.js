import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom"
import API from "../../Config/api";

function Login(){
    const navigate = useNavigate();
    const [input ,setInput] = useState({
      email : "",
      password : ""
    })
    const [error, setError] = useState({})
    const handleInput = (e) =>{
      const nameInput = e.target.name
      const valueInput = e.target.value
      setInput(state=>({...state,[nameInput]:valueInput}))
    }
    function handleSubmit(e){
      e.preventDefault();
      let flag = true
      let errorSubmit = {}
      if(input.email === ""){
        errorSubmit.email = " vui long nhapa mail"
        flag = false
      }
      if(input.password === ""){
        errorSubmit.password = "vui long nhap pass"
      }
      if(!flag){
        setError(errorSubmit)
      }else {
        const data = {
          email : input.email,
          password : input.password,
          level : 0
        }
        API.post("/login",data)
        .then(res =>{
          if(res.data.errors){
            setError(res.data.errors)
          }else{
            let info = JSON.stringify(res)
            localStorage.setItem("data",info)
            console.log(res)
            alert("dang nhap thanh cong")
            navigate('/')
          }
        })
      }
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
          return(
        <div className="login-form">
                <h2>Login to your account</h2>
                {renderError()}
                <form onSubmit={handleSubmit}>
                  <input type="email" placeholder="email" name="email" onChange={handleInput}/>
                  <input type="password" placeholder="password" name="password" onChange={handleInput} />
                  <span>
                    <input type="checkbox" className="checkbox" /> 
                    Keep me signed in
                  </span>
                  <button type="submit" className="btn btn-default">Login</button>
                </form>
              </div>
    )
}
export default Login