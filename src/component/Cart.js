import { useEffect, useState } from "react";
import API from "../Config/api";

function Cart(){
    const [data, setData] = useState([])
     let cart = localStorage.getItem("cart")
    cart = JSON.parse(cart) || {}

    useEffect(()=>{
    if(cart){
            API.post("/product/cart",cart)
            .then(res =>{
                console.log(res)
                setData(res.data.data)
            })
            .catch(err =>{
                console.log(err)
            })
    }
    },[cart])

    const handleQtyChangeUp = (e) =>{
        const id = e.target.id
        if(id){
            cart[id] = cart[id] + 1
            console.log("thanh cong")
            localStorage.setItem("cart",JSON.stringify(cart))
            // API.post("/product/cart",cart)
            // .then(res =>{
            //     console.log(res)
            //     setData(res.data.data)
            // })
            // .catch(err =>{
            //     console.log(err)
            // })
        }

    }
    const handleQtyChangeDown = (e) =>{
        const id = e.target.id
        console.log(id)
        if(id){
            cart[id] = cart[id] - 1
            console.log("thanh cong")
            localStorage.setItem("cart",JSON.stringify(cart))
            // API.post("/product/cart",cart)
            // .then(res =>{
            //     console.log(res)
            //     setData(res.data.data)
            // })
            // .catch(err =>{
            //     console.log(err)
            // })
        }
    }
    const total = (price,quantity) =>{
      return price * quantity
    } 
    const totalAll = ()=>{
      return data.reduce((sum,item) => sum + item.price* item.qty,0 )
    }
    const handleDeleteProduct = (e) =>{
      const id = e.target.id
      if(id){
        let cart = JSON.parse(localStorage.getItem("cart")) || {};
        delete cart[id]
        localStorage.setItem("cart",JSON.stringify(cart))

            // API.post("/product/cart",cart)
            // .then(res =>{
            //     console.log(res)
            //     setData(res.data.data)
            // })
            // .catch(err =>{
            //     console.log(err)
            // })
      }

    }

    return (
      <div>
        <section id="cart_items">
          <div  className="container">
            <div className="breadcrumbs">
              <ol className="breadcrumb">
                <li><a href="#">Home</a></li>
                <li className="active">Shopping Cart</li>
              </ol>
            </div>
            <div className="table-responsive cart_info">
              <table className="table table-condensed">
                <thead>
                  <tr className="cart_menu">
                    <td className="image">Item</td>
                    <td className="description" />
                    <td className="price">Price</td>
                    <td className="quantity">Quantity</td>
                    <td className="total">Total</td>
                    <td />
                  </tr>
                </thead>
                <tbody>
                {data.map(item => (
                  <tr>
                    <td className="cart_product">
                      <a href><img src={"http://localhost/laravel8/laravel8/public/upload/product/" + item.id_user + "/" + item.image[0]} alt="" /></a>
                    </td>
                    <td className="cart_description">
                      <h4><a href>{item.name}</a></h4>
                      <p>Web ID: 1089772</p>
                    </td>
                    <td className="cart_price">
                      <p>${item.price}</p>
                    </td>
                    <td className="cart_quantity">
                      <div className="cart_quantity_button">
                        <button className="cart_quantity_up" id={item.id} onClick={handleQtyChangeUp} onCli> + </button>
                        <input className="cart_quantity_input" type="text"  name="quantity" value={item.qty} autoComplete="off" size={2} />
                        <button className="cart_quantity_down" id={item.id} onClick={handleQtyChangeDown}> - </button>
                      </div>
                    </td>
                    <td className="cart_total">
                      <p className="cart_total_price">${total(item.price,item.qty)}</p>
                    </td>
                    <td className="cart_delete">
                      <button id={item.id} onClick={handleDeleteProduct} className="cart_quantity_delete" href><i className="fa fa-times" /></button>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </section> {/*/#cart_items*/}
        <section id="do_action">
          <div className="container">
            <div className="heading">
              <h3>What would you like to do next?</h3>
              <p>Choose if you have a discount code or reward points you want to use or would like to estimate your delivery cost.</p>
            </div>
            <div className="row">
              <div className="col-sm-6">
                <div className="chose_area">
                  <ul className="user_option">
                    <li>
                      <input type="checkbox" />
                      <label>Use Coupon Code</label>
                    </li>
                    <li>
                      <input type="checkbox" />
                      <label>Use Gift Voucher</label>
                    </li>
                    <li>
                      <input type="checkbox" />
                      <label>Estimate Shipping &amp; Taxes</label>
                    </li>
                  </ul>
                  <ul className="user_info">
                    <li className="single_field">
                      <label>Country:</label>
                      <select>
                        <option>United States</option>
                        <option>Bangladesh</option>
                        <option>UK</option>
                        <option>India</option>
                        <option>Pakistan</option>
                        <option>Ucrane</option>
                        <option>Canada</option>
                        <option>Dubai</option>
                      </select>
                    </li>
                    <li className="single_field">
                      <label>Region / State:</label>
                      <select>
                        <option>Select</option>
                        <option>Dhaka</option>
                        <option>London</option>
                        <option>Dillih</option>
                        <option>Lahore</option>
                        <option>Alaska</option>
                        <option>Canada</option>
                        <option>Dubai</option>
                      </select>
                    </li>
                    <li className="single_field zip-field">
                      <label>Zip Code:</label>
                      <input type="text" />
                    </li>
                  </ul>
                  <a className="btn btn-default update" href>Get Quotes</a>
                  <a className="btn btn-default check_out" href>Continue</a>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="total_area">
                  <ul>
                    <li>Cart Sub Total <span>$59</span></li>
                    <li>Eco Tax <span>$2</span></li>
                    <li>Shipping Cost <span>Free</span></li>
                    <li>Total <span>${totalAll()}</span></li>
                  </ul>
                  <a className="btn btn-default update" href>Update</a>
                  <a className="btn btn-default check_out" href>Check Out</a>
                </div>
              </div>
            </div>
          </div>
        </section>{/*/#do_action*/}
      </div>
    );

}
export default Cart