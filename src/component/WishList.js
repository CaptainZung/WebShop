import { useEffect, useState } from "react"
import API from "../Config/api"

function Wishlist(){
    const [wishList, setWishList] = useState([])
    useEffect(()=>{
        API.get("/product/wishlist")
        .then(res =>{
            console.log(res.data.data)
            setWishList(res.data.data)
        })
        .catch(err =>{
            console.log(err)
        })
    })
    let getIdWishList = JSON.parse(localStorage.getItem("wishlist"))
    getIdWishList = Object.keys(getIdWishList)
    return(
        <div className="features_items">{/*features_items*/}
                  <h2 className="title text-center">Features Items</h2>
                 {wishList.filter(item => getIdWishList.includes(String(item.id))).map(item =>(
                   <div className="col-sm-4" value={item.id} key={item.id}>
                    <div className="product-image-wrapper">
                      <div className="single-products" >
                        <div className="productinfo text-center">
                          <img src={"http://localhost/laravel8/laravel8/public/upload/product/"+item.id_user+"/"+JSON.parse(item.image)[0]} alt="" />
                          <h2>{item.price}</h2>
                          <p>{item.name}</p>
                          <a href="#" className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</a>
                        </div>
                        <div className="product-overlay">
                          <div className="overlay-content">
                            <h2>{item.price}</h2>
                            <p>{item.name}</p>
                            {/* <button  onClick={()=>getIdProduct(item.id)} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />Add to cart</button>
                            <Link to={"/product/detail/"+ item.id}className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart" />More</Link> */}
                          </div>
                        </div>
                      </div>
                      <div className="choose">
                        <ul className="nav nav-pills nav-justified">
                          {/* <li><button onClick={()=>AddToWL(item.id)}><i className="fa fa-plus-square" />{wishList[item.id] ? "Remove wishList" :"Add to wishlist"}</button></li> */}
                          <li><a href="#"><i className="fa fa-plus-square" />Add to compare</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                 ))}

                </div>
    )
}
export default Wishlist