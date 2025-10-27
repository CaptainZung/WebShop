import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import API from "../../Config/api";
import Comment from "./Detail/Comment";
import ListCmt from "./Detail/ListCmt";
import Rate from "./Detail/Rate";
function BlogDetail(props){
    let params =useParams();
    const [data, setData] = useState('')
    const [comment, setComment] = useState([])
    const [idRely, setIdRely] = useState(0)
    function getIdCha(data){
     console.log(data)
    setIdRely(data)
    }  
    

    function getCmt(data){
      console.log(data)

     setComment(prev => [...prev, data]);
    }
    



    useEffect(()=>{
        API.get('/blog/detail/'+params.id)
        .then(res =>{
            setData(res.data.data)
            setComment(res.data.data.comment)
        })
        .catch(err =>{
          console.log(err)
        })
    },[])
    return (

      <section>
        <div className="container">
          <div className="row">
            <div className="col-sm-3"> 
            </div>
            <div className="col-sm-9">
              <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>
                <div className="single-blog-post" key={data.id}>
                  <h3>{data.title}</h3>
                  <div className="post-meta">
                    <ul>
                      <li><i className="fa fa-user" /> Mac Doe</li>
                      <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                      <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                    </ul>
                    {/* <span>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star-half-o"></i>
								</span> */}
                  </div>
                  <a href>
                    <img src={"http://localhost/laravel8/laravel8/public/upload/Blog/image/" + data.image} alt="" />
                  </a>
                 <p>{data.content}</p>
                  <div className="pager-area">
                    <ul className="pager pull-right">
                      <li><a href="#">Pre</a></li>
                      <li><a href="#">Next</a></li>
                    </ul>
                  </div>
                </div>
              </div>{/*/blog-post-area*/}
              <Rate id={params.id}/>
              <div className="socials-share">
                <a href><img src="images/blog/socials.png" alt="" /></a>
              </div>{/*/socials-share*/}
              {/* <div class="media commnets">
						<a class="pull-left" href="#">
							<img class="media-object" src="images/blog/man-one.jpg" alt="">
						</a>
						<div class="media-body">
							<h4 class="media-heading">Annie Davis</h4>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
							<div class="blog-socials">
								<ul>
									<li><a href=""><i class="fa fa-facebook"></i></a></li>
									<li><a href=""><i class="fa fa-twitter"></i></a></li>
									<li><a href=""><i class="fa fa-dribbble"></i></a></li>
									<li><a href=""><i class="fa fa-google-plus"></i></a></li>
								</ul>
								<a class="btn btn-primary" href="">Other Posts</a>
							</div>
						</div>
					</div> */}{/*Comments*/}
              <ListCmt id={params.id} data={data} comment={comment} getIdCha={getIdCha}/>
              <Comment id={params.id} data ={data} getCmt={getCmt} idCha={idRely}/>
            </div>	
          </div>
        </div>
      </section>

    )
}
export default BlogDetail