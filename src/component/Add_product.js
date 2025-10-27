import { useEffect, useState } from "react";
import API from "../Config/api";

function AddProduct(){
    const [data,setData] = useState({})
    const [categorySelect, setCategorySelect] = useState("")
    const [brandSelect, setBrandSelect] = useState("")
    const [input ,setInput]= useState({
        name: "",
        price : ""
    })
    const [image, setImage] = useState([])
    const [status, setStatus] = useState(1)
    const [sale, setSale] = useState(0)
    const [detail, setDetail]= useState("")
    const [company, setCompany] = useState("")
    const [error, setError] = useState({})
    const handleInput = (e) =>{
        const nameInput = e.target.name
        const valueInput = e.target.value
        setInput(state=>({...state,[nameInput]:valueInput}))
    }
    const handleCategorySelect = (e)=>{
        setCategorySelect(e.target.value)
    }
    const handleBrandSelect = (e)=>{
        setBrandSelect(e.target.value)
    }
    const handleStatusSelect = (e)=>{
        setStatus(e.target.value)
        
    }
    const handleChangeDetail = (e)=>{
        setDetail(e.target.value)
    }
    const handleChangeCompany =(e)=>{
        setCompany(e.target.value)
    }
    const handleFile = (e) =>{
        const files = e.target.files
        if(files.length >3 ){
            alert("toi da 3 anhr")
        }else{
        setImage(files)
        }
    }
    function checkSale(){
        if(status == 0){
            const handleInputSale = (e)=>{
                setSale(e.target.value)
            }
            return(
                <input type="text" placeholder="nhap % giam giá" value={sale}onChange={handleInputSale}/>
            )
        }
    }
    useEffect(()=>{
    API.get("/category-brand")
    .then(res=>{
        console.log(res)
        setData(res.data)
    })
    .catch(err =>{
        console.log(err)
    })
    
    },[])
    function handleSubmit(e){
        e.preventDefault()
        let isError = {}
        let flag = true
        if(categorySelect == ""){
            isError.category ="vui long chon category"
            flag = false
        }
        if(brandSelect == ""){
            isError.brand = " vui long chon brand"
            flag = false
        }
        if(image == ""){
            isError.image = "vui long chon anh"
            flag = false
        }
        if(status == ""){
            isError.status = "vui long chon status"
            flag = false
        }
        if(status == 0 && sale == 0){
            isError.sale = "vui long nhap sale"
            flag = false
        }
        if(detail == ""){
            isError.detail = " vui long nhap detail"
            flag = false
        }
        if(company ==""){
            isError.company = " vui long nhap company"
            flag =false
        }
        if(!flag){
            setError(isError)
        }else{
            setError({})
            let info = localStorage.getItem("data")
            if(info)
            info = JSON.parse(info)
            let config = {
            headers: {
          'Authorization': 'Bearer ' + info.data.token,
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
      };
      const formData = new FormData()
      formData.append('name',input.name)
      formData.append('price',input.price)
      formData.append('category',categorySelect)
      formData.append('brand', brandSelect)
      formData.append('company', company)
      formData.append('detail', detail)
      formData.append('status', status)
      formData.append('sale', sale)
      Object.keys(image).map((item,i)=>{
        formData.append("file[]",image[item])
      })
      API.post("user/product/add",formData,config)
      .then(res=>{
        alert("them thanh cong")
        console.log(res)
      })
      .catch(err =>{
        console.log(err)
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
    return (
      <div className="col-sm-9">
        <div className="blog-post-area">
          <h2 className="title text-center">Add product</h2>
          <div className="signup-form">{/*sign up form*/}
            <h2>Create product !</h2>
            {renderError()}
            <form onSubmit={handleSubmit}>
              <select value={categorySelect} onChange={handleCategorySelect}>
                <option value="">-- Chọn --</option>
                {data.category?.map(item =>(
                    <option key={item.id} value={item.id}>{item.category}</option>
                ))}
              </select>
              <select value={brandSelect} onChange={handleBrandSelect}>
                <option value="">-- Chọn --</option>
                {data.brand?.map(item =>(
                    <option key={item.id} value={item.id}>{item.brand}</option>
                ))}
              </select>
                <input type="file" placeholder="Name" id="files" name="files" multiple onChange={handleFile}/>
              <input type="text" placeholder="Name" name="name" onChange={handleInput}/>
              <input type="text" placeholder="Price" name="price" onChange={handleInput}/>
              <select value={status} onChange={handleStatusSelect}>
                <option value="1">new</option>
                <option value="0">sale</option>
              </select>
                {checkSale()}
              <textarea type="text" placeholder="detail" onChange={handleChangeDetail}></textarea>
              <input type="text" placeholder="company" onChange={handleChangeCompany}/>
              <button type="submit" className="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
}
export default AddProduct