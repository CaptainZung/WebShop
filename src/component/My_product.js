import { useEffect, useState } from "react";
import API from "../Config/api";
import EditProduct from "./Edit_product";
import { Link } from "react-router-dom";

function MyProduct(props){
    const [data, setData] = useState([])
    let info = localStorage.getItem("data")
    if(info){
        info = JSON.parse(info)
        console.log(info)
    }
     let config = {
            headers: {
          'Authorization': 'Bearer ' + info.data.token,
        }
    }
    useEffect(()=>{
        API.get("user/my-product",config)
        .then(res=>{
            console.log(res)
            setData(res.data.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
    
    function deleteProduct(e){
      const takeId = e.target.id
    
      API.get("user/product/delete/"+takeId,config)
      .then(res=>{
        alert("xoa thanh cong")
        API.get("user/my-product",config)
        .then(res=>{
            console.log(res)
            setData(res.data.data)
        })
        .catch(err=>{
            console.log(err)
        })
      })
      .catch(err=>{
        console.log(err)
      })
    }
    return (

      <div className="col-sm-9">
        <div className="table-responsive cart_info">
          <table className="table table-condensed">
            <thead>
              <tr className="cart_menu">
                <td className="image">image</td>
                <td className="description">description</td>
                <td className="price">price</td>
                <td className="total">action</td>
              </tr>
            </thead>
            <tbody>
             {Object.values(data).map((value,index) =>(
                 <tr key={value.id}>
                  <td className="cart_product">
                    <a href><img width="80px"src={"http://localhost/laravel8/laravel8/public/upload/product/"+value.id_user+"/"+JSON.parse(value.image)[0]} alt="" /></a>
                  </td>
                  <td className="cart_description">
                    <h4><a href>{value.name}</a></h4>
                  </td>
                  <td className="cart_price">
                    <p> ${value.price}</p>
                  </td>
                  <td className="cart_total">
                    <Link to={"/user/product/"+value.id}><button>edit</button></Link>
                    <button id={value.id} onClick={deleteProduct}>delete</button>
                  </td>
                </tr>
             ))}
            </tbody>
          </table>
        </div>
      </div>
    );

}
export default MyProduct