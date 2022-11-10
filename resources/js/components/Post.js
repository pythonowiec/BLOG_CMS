import { divide } from "lodash";
import React, { useState, useEffect } from "react";
import ReactDOM from "react";
import { Link, useParams } from "react-router-dom";
import img from './images/im.jpg';
import img2 from './images/im2.jpg';
import 'axios';
import { DiscussionEmbed } from 'disqus-react';
import axios from "axios";
import { HandThumbsDown, HandThumbsUp } from "react-bootstrap-icons";

const Post = () => {

    const [error, setError] = useState(null);
    const [isLoaded, setisLoaded] = useState(false);
    const [item, setItem] = useState([]);
    const [comment, setComment] = useState([]);
    const [comments, setComments] = useState([]);
    const [nick, setNick] = useState([]);
    const [views, setViews] = useState([]);

    let { id } = useParams();
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/posts/${id}`)
            .then(function (response) {
                // handle success
                console.log(response.data['views']);
                setItem(response.data['post'][0])
                setViews(response.data['views'])

                axios.get(`http://127.0.0.1:8000/api/comments/${response.data['post'][0]['id']}`)
                    .then(function (response) {
                        // handle success
                        setisLoaded(true)
                        console.log(response.data)
                        setComments(response.data)
                    })
                    .catch(function (error) {
                        // handle error
                        setError(error)
                        setisLoaded(true)
                    })
            })
            .catch(function (error) {
                // handle error
                setError(error)
                setisLoaded(true)
            })

    }, []);

    const addComment = (e) => {
        const id = e.target.getAttribute('data-id');
        axios.post(`http://127.0.0.1:8000/api/comments`, {
            id: id,
            content: comment,
            nickname: nick
        })

    }

    const OnChangeComment = (e) => {
        setComment(e.target.value)
    }
    const OnChangeNick = (e) => {
        setNick(e.target.value)
    }

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
                    <p className='views col-6'>{views} views</p>
                    <p className='title-post'>{item.title}</p>
                    <p className="content-post" dangerouslySetInnerHTML={{
                        __html: item.content
                    }}></p>
                </div>
                {/* <div className="row">
                    {/* <DiscussionEmbed
                        shortname='carblog'
                        config={
                            {
                                url: `https://carblog-1.disqus.com/${id}`,
                                identifier: `${id}`,
                                title: item.title,
                                language: 'pl_Pl' 
                            }
                        }
                    
                    <div class="form-floating">
                        <input class="form-control comment-nick" placeholder="Leave a nick here" id="floatingTextarea" onChange={OnChangeNick} />
                        <label htmlFor="floatingTextarea" className="comment-label">Put your nick</label>
                    </div>
                    <div class="form-floating mt-3">
                        <textarea class="form-control comment-content" placeholder="Leave a comment here" id="floatingTextarea" onChange={OnChangeComment}></textarea>
                        <label htmlFor="floatingTextarea" className="comment-label">Put your comment</label>
                    </div>
                    <div className="mt-3">
                        <button type="button" className="btn btn-outline-light float-end" onClick={addComment} data-id={item.id}>Send</button>
                    </div>
                </div> */}
                <div className="row">
                    {(() => {
                        if (typeof (comments) == 'undefined') {
                            return (
                                <div class="card comments">
                                    <div class="card-header text-center">
                                        <h3>Comments</h3>
                                    </div>
                                    <div class="form-floating mt-3">
                                        <input class="form-control comment-nick" placeholder="Leave a nick here" id="floatingTextarea" onChange={OnChangeNick} />
                                        <label htmlFor="floatingTextarea" className="comment-label">Put your nick</label>
                                    </div>
                                    <div class="form-floating mt-3">
                                        <textarea class="form-control comment-content" placeholder="Leave a comment here" id="floatingTextarea" onChange={OnChangeComment}></textarea>
                                        <label htmlFor="floatingTextarea" className="comment-label">Put your comment</label>
                                    </div>
                                    <div className="mt-3">
                                        <button type="button" className="btn btn-outline-light float-end" onClick={addComment} data-id={item.id}>Send</button>
                                    </div>
                                    <div className="card-body">
                                        <p className="text-white">Don't have any comments</p>
                                    </div>
                                </div>

                            )
                        } else {
                            return (
                                <div class="card comments">
                                    <div class="card-header text-center">
                                        <h3>Comments</h3>
                                    </div>
                                    <div class="form-floating mt-3">
                                        <input class="form-control comment-nick" placeholder="Leave a nick here" id="floatingTextarea" onChange={OnChangeNick} />
                                        <label htmlFor="floatingTextarea" className="comment-label">Put your nick</label>
                                    </div>
                                    <div class="form-floating mt-3">
                                        <textarea class="form-control comment-content" placeholder="Leave a comment here" id="floatingTextarea" onChange={OnChangeComment}></textarea>
                                        <label htmlFor="floatingTextarea" className="comment-label">Put your comment</label>
                                    </div>
                                    <div className="mt-3">
                                        <button type="button" className="btn btn-outline-light float-end" onClick={addComment} data-id={item.id}>Send</button>
                                    </div>
                                    {comments.map((comment => (
                                        <div>
                                            <div class="card-body">
                                                <h5 class="card-title">{comment.nickname}</h5>
                                                <p class="card-text">{comment.content}</p>
                                                <a href="#"><HandThumbsUp/> {comment.likes}</a>
                                                <a href="#"><HandThumbsDown/> {comment.dislikes}</a>
                                            </div>
                                            <div class="card-footer text-muted">
                                                2 days ago
                                            </div>
                                        </div>
                                    )))}
                                </div>

                            )
                        }
                    })()}
                </div>
            </div>

        );
    }
}
export default Post