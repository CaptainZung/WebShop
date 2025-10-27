
import { useEffect, useState } from "react";
import API from "../../Config/api";
import { Link } from "react-router-dom";

function Blog(){
    const [getItem, setItem] = useState({})
    useEffect(()=>{
        API.get('/blog')
        .then(res=>{
          console.log(res)
            setItem(res)

        })
        .catch(err =>{
            console.log(err)
        })
    },[])
    function fetchData(){
      if( Object.keys(getItem).length >0){
        return  getItem.data.blog.data.map((value)=>{
           return (
          <div className="single-blog-post">
        <h3>{value.title}</h3>
        <div className="post-meta">
          <ul>
            <li><i className="fa fa-user" /> Mac Doe</li>
            <li><i className="fa fa-clock-o" /> 1:33 pm</li>
            <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
          </ul>
          <span>
            <i className="fa fa-star" />
            <i className="fa fa-star" />
            <i className="fa fa-star" />
            <i className="fa fa-star" />
            <i className="fa fa-star-half-o" />
          </span>
        </div>
        <a href>
          <img src={"http://localhost/laravel8/laravel8/public/upload/Blog/image/" + value.image} alt="" />
        </a>
        <p>{value.description}</p>
        <Link to={"/blog/detail/" + value.id} className="btn btn-primary">Read More</Link>
      </div>
      )
        })
      }
     
    }
    return (
             <section>
          <div className="container">
            <div className="row">
              <div className="col-sm-9">
                <div className="blog-post-area">
                  <h2 className="title text-center">Latest From our Blog</h2>
                  {fetchData()}
                  <div className="pagination-area">
                    <ul className="pagination">
                      <li><a href className="active">1</a></li>
                      <li><a href>2</a></li>
                      <li><a href>3</a></li>
                      <li><a href><i className="fa fa-angle-double-right" /></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    );

}
export default Blog