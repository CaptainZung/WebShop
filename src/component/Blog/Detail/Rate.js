import StarRatings from 'react-star-ratings';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../../Config/api';

function Rate(props) {
  const navigate = useNavigate()
  let params = useParams()
  let { id } = props
  const [rating, setRating] = useState(0)

    useEffect(()=>{
    API.get("/blog/rate/"+id)
    .then(res=>{
      console.log(res.data)
      const data = res.data.data; 
      let avg = data.map(item => item.rate)
      avg = getAverage(avg)
      console.log("Trung bình rating:", avg); 
      setRating(avg);
    })
    .catch(err=>{
      console.error(err)
    })
  },[])
  function getAverage(arr) {
  if (!arr || arr.length === 0) return 0; 
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}
  function changeRating(newRating, name) {
    setRating(newRating)
      let info = localStorage.getItem("data")
      if (info) {
        info = JSON.parse(info)
        let config = {
          headers: {
            'Authorization': 'Bearer ' + info.data.token,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          }
        };
        if (rating) {
          const formData = new FormData();
          formData.append('user_id', info.data.Auth.id)
          formData.append('blog_id', id)
          formData.append('rate', rating)
          API.post("/blog/rate/" + params.id, formData, config)
            .then(res => {
              alert("CMT thanh cong")
            })
            .catch(err => {
              alert("that bai")
            })
        }
      } else {
        alert("vui long login")
      }
  }

  return (

    <StarRatings
      rating={rating}
      starRatedColor="blue"
      changeRating={changeRating}
      numberOfStars={5}
      name='rating'
    />
  );

}
export default Rate