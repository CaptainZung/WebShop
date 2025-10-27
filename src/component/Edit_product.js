import { useEffect, useState } from "react";
import API from "../Config/api";

import { useParams } from "react-router-dom";

function EditProduct() {
  let params = useParams()
  const [categoryList, setCategoryList] = useState([])
  const [brandList, setBrandList] = useState([])
  const [oldImages, setOldImages] = useState([]);
  const [avatarCheckBox, setAvatarCheckBox] = useState([]);
  const [image, setImage] = useState([])

  const [data, setData] = useState({
    id_user: "",
    name: "",
    price: "",
    category: "",
    brand: "",
    company: "",
    detail: "",
    status: "",
    sale: "",
    image: "",
  })
  const handleBrandSelect = (e) => {
    const value = e.target.value
    setData((prev) => ({
      ...prev,
      brand: value
    }))
  }
  const handleCategorySelect = (e) => {
    const value = e.target.value
    setData((prev) => ({
      ...prev,
      category: value
    }))
  }
  let info = localStorage.getItem("data")
  if (info) {
    info = JSON.parse(info)
  }
  let config = {
    headers: {
      'Authorization': 'Bearer ' + info.data.token,
    }
  }
  useEffect(() => {
    API.get("category-brand")
      .then(res => {
        console.log(res)
        setCategoryList(res.data.category)
        setBrandList(res.data.brand)
      })

    API.get("user/product/" + params.id, config)
      .then(res => {
        res = res.data.data
        console.log(res)


        setData({
          id_user: res.id_user,
          name: res.name,
          price: res.price,
          company: res.company_profile,
          status: res.status,
          sale: res.sale,
          category: res.id_category,
          brand: res.id_brand,
          detail: res.detail
        })
        setOldImages(res.image)


      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  const handleNameChange = (e) => {
    const value = e.target.value
    setData((prev) => ({
      ...prev,
      name: value
    }))
  }
  const handlePriceChange = (e) => {
    const value = e.target.value
    setData((prev) => ({
      ...prev,
      price: value
    }))
  }
  const handleChangeDetail = (e) => {
    const value = e.target.value
    setData((prev) => ({
      ...prev,
      detail: value
    }))
  }
  const handleCheckBoxChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    setAvatarCheckBox((prev) => {
      if (checked) {
        return [...prev, value]
      } else {
        return prev.filter((item) => item !== value)
      }
    })
  }
  const handleFile = (e) => {
    const files = Array.from(e.target.files);
    const remainingImages = oldImages.length - avatarCheckBox.length;
    const total = remainingImages + files.length;

    if (total > 3) {
      alert("tong so hinh ko dc >3");
      e.target.value = null; // reset input file
      return;
    }

    setImage(files);
  }
  const handleStatus = (e) => {
    const value = e.target.value
    setData((prev) => ({
      ...prev,
      status: value
    }))
  }
  function checkSale() {
    if (data.status == 0) {
      const handleSaleChange = (e) => {
        const value = e.target.value
        setData((prev)=>({
          ...prev,
          sale : value,
        }))
      }
      return (
        <input type="text" placeholder="nhap % giam giá" value={data.sale} onChange={handleSaleChange} />
      )
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    let info = localStorage.getItem("data")
    if (info)
      info = JSON.parse(info)
    let config = {
      headers: {
        'Authorization': 'Bearer ' + info.data.token,
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
      }
    };
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('price', data.price)
    formData.append('category', data.category)
    formData.append('brand', data.brand)
    formData.append('company', data.company)
    formData.append('detail', data.detail)
    formData.append('status', data.status)
    formData.append('sale', data.sale)
    avatarCheckBox.forEach((item) => {
      formData.append("avatarCheckBox[]", item);
    });
    image.forEach((file) => {
      formData.append("file[]", file);
    });
    API.post("user/product/update/" + params.id, formData, config)
      .then(res => {
        alert("update thanh cong")
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })

  }

  return (

    <div className="col-sm-9">

      <div className="blog-post-area">
        <h2 className="title text-center">Edit Product</h2>
        <div className="signup-form">{/*sign up form*/}
          <h2>Edit Product here</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={data.name} onChange={handleNameChange} />
            <input type="text" placeholder="Price" value={data.price} onChange={handlePriceChange} />
            <select value={data.category} onChange={handleCategorySelect}>
              <option value="">-- vui long chon category</option>
              {categoryList?.map(item => (
                <option key={item.id} value={item.id}>{item.category}</option>
              ))}
            </select>
            <select value={data.brand} onChange={handleBrandSelect}>
              <option value="" > vui long chon brand</option>
              {brandList?.map(item => (
                <option key={item.id} value={item.id}>{item.brand}</option>
              ))}
            </select>
            <select value={data.status} onChange={handleStatus}>
              <option value="">--Vui long chon status</option>
              <option value="1">new</option>
              <option value="0">sale</option>
            </select>
            {checkSale()}
            <ul>
              {oldImages.map((value, index) => (
                <li key={index}>
                  <img src={"http://localhost/laravel8/laravel8/public/upload/product/" + data.id_user + "/" + value} width="100px" />
                  <input type="checkbox" value={value} onChange={handleCheckBoxChange} checked={avatarCheckBox.includes(value)} />
                </li>
              ))}
            </ul>
            <input type="file" placeholder="Name" id="files" name="files" multiple onChange={handleFile} />
            <textarea type="text" placeholder="detail" value={data.detail} onChange={handleChangeDetail}></textarea>
            <button type="submit" className="btn btn-default">Signup</button>
          </form>
        </div>
      </div>
    </div>

  );
}
export default EditProduct