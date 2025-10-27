

import { useState } from "react"
import BlogDetail from "../BlogDetail"
import Comment from "./Comment"
function ListCmt(props) {
  console.log(props.data)
  const {getIdCha} = props
  const {comment} = props
  const [idCha, setIdCha] = useState(0) 
  const layIdCha = (e) => {
    const id = e.target.id
    setIdCha(id)
    getIdCha(idCha)
  }
  const commentCha = comment.filter(cmt => cmt.id_comment ===0 )

  
    return (
    
    <div className="response-area">

      <h2>3 RESPONSES</h2>
      <ul className="media-list">
        {commentCha.map(comments =>(
      <li key={comments.id} className="media second-media">
          <a className="pull-left" href="#">
            <img width="100px" className="media-object" src={"http://localhost/laravel8/laravel8/public/upload/user/avatar/" + comments.image_user } alt="" />
          </a>
          <div className="media-body">
            <ul className="sinlge-post-meta"> 
              <li><i className="fa fa-user" />{comments.name_user}</li>
              <li><i className="fa fa-clock-o" /> 1:33 pm</li>
              <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
            </ul>
            <p>{comments.comment}</p>
            <a href="#cmt" className="btn btn-primary"  id={comments.id} onClick={layIdCha} ><i className="fa fa-reply" />Replay</a>
            {comment.filter(commentCon=>commentCon.id_comment === comments.id).map(commentCon=>(
          <ul className="media-list" style={{marginLeft : 20}}>

      <li key={commentCon.id} className="media second-media">
          <a className="pull-left" href="#">
            <img width="100px" className="media-object" src={"http://localhost/laravel8/laravel8/public/upload/user/avatar/" + commentCon.image_user } alt="" />
          </a>
          <div className="media-body">
            <ul className="sinlge-post-meta"> 
              <li><i className="fa fa-user" />{commentCon.name_user}</li>
              <li><i className="fa fa-clock-o" /> 1:33 pm</li>
              <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
            </ul>
            <p>{commentCon.comment}</p>
            <a href="#cmt" className="btn btn-primary"  id={commentCon.id} onClick={layIdCha} ><i className="fa fa-reply" />Replay</a>
          </div>
        </li>
      </ul>
          ))}
          </div>
        </li>
      ))}
      </ul>
      
    </div>
  )
}
export default ListCmt