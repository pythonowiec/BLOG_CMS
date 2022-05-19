import { divide } from "lodash";
import React, { useState, useEffect } from "react";
import ReactDOM from "react";
import { Link, useParams } from "react-router-dom";
import img from './images/im.jpg';
import img2 from './images/im2.jpg';
import 'axios';

const Post = () =>{
    
    const [error, setError] = useState(null);
    const [isLoaded, setisLoaded] = useState(false);
    const [item, setItem] = useState([]);

    let { id } = useParams();
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/posts/${id}`)
            .then(function (response) {
                // handle success
                setisLoaded(true)
                setItem(response.data[0])
                console.log(response.data[0])
            })
            .catch(function (error) {
                // handle error
                setError(error)
                setisLoaded(true)
            })
            
    }, []);

    if (error) {
        return <div>Błąd: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Ładowanie...</div>;
    } else {
        return (
            <div className='container'>
                <div className='row mt-5'>
                    <div className='col-1'></div>
                    <div className='col-11'>
                            <div className='post'>
                                <img className='img-fluid' src={img2} alt="" />
                            </div>
                    </div>
                </div>
                <div className="row">
                    <p className='title-post'>{item.title}</p>
                    <p className='published-post'>Posted by Start Bootstrap on {item.created_at}</p>
                    <p className="content-post" dangerouslySetInnerHTML={{
                        __html: item.content
                    }}></p>
                </div>
            </div>

        );
    }
}
export default Post