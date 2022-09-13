import { divide } from "lodash";
import React, { useState, useEffect } from "react";
import ReactDOM from "react";
import { Link, useParams } from "react-router-dom";
import img from './images/im.jpg';
import img2 from './images/im2.jpg';
import 'axios';
import { DiscussionEmbed } from 'disqus-react';

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
        return <div className="loader"></div>;
    } else {
        return (
            <div className='container'>
                <div className='row mt-5'>
                    <div className='post'>
                        {(() => {
                                if (item.image != 'test') {
                                    return (
                                        <img className='img-fluid' src={`https://res.cloudinary.com/dtoiehbpt/image/upload/v1651426819/${item.image}.jpg`} alt="" />
                                    )
                                } else {
                                    return (
                                        <img className='img-fluid' src={img2} alt="" />
                                    )
                                }
                        })()}
                    </div>
                </div>
                <div className="row pt-2">
                    <p className='published-post col-6'>Posted by {item.name} on {item.created_at}</p>
                    <p className='views col-6'>{item.views} views</p>
                    <p className='title-post'>{item.title}</p>
                    <p className="content-post" dangerouslySetInnerHTML={{
                        __html: item.content
                    }}></p>
                </div>
                <div class="row">
                    <DiscussionEmbed
                        shortname='carblog'
                        config={
                            {
                                url: `https://carblog-1.disqus.com/${id}`,
                                identifier: `${id}`,
                                title: item.title,
                                language: 'pl_Pl' //e.g. for Traditional Chinese (Taiwan)	
                            }
                        }
                    />
                </div>
            </div>

        );
    }
}
export default Post