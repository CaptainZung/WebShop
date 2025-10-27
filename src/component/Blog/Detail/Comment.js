import { useParams } from "react-router-dom"
import API from "../../../Config/api"
import { useState } from "react"
import BlogDetail from "../BlogDetail"
import ListCmt from "./ListCmt"

function Comment(props) {

  const [comment, setComment] = useState([])

  const {idCha} = props
  const handleInput = (e) => {
    const valueInput = e.target.value
    setComment(valueInput)
  }

  const { getCmt } = props
  function checkLog() {
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
      if (comment) {
        const formData = new FormData();
        formData.append('id_blog', props.id)
        formData.append('id_user', info.data.Auth.id)
        formData.append('id_comment',  idCha ? idCha : 0)
        formData.append('comment', comment)
        formData.append('image_user', info.data.Auth.avatar)
        formData.append('name_user', info.data.Auth.name)

        API.post("/blog/comment/" + props.id, formData, config)
          .then(res => {
            alert("CMT thanh cong")
            // console.log(res)
            getCmt(res.data.data)
            setComment("")
          })
          .catch(err => {
            console.log(err)
          })

      }
    } else {
      alert("vui long login")
    }
  }
  return (<>
    <div className="replay-box">
      <div className="row">
        <div className="col-sm-12">
          <h2>Leave a replay</h2>
          <div className="text-area">
            <div className="blank-arrow">
              <label>Your Name</label>
            </div>
            <span>*</span>
            <textarea id="cmt" name="message" rows={11} onChange={handleInput} />
            <a className="btn btn-primary" onClick={checkLog} href>post comment</a>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}
export default Comment