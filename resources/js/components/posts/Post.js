import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import like from '../images/like.png';
import likeFill from '../images/like-fill.png';
import dislike from '../images/dislike.png';
import disLikeFill from '../images/dislike-fill.png';
import 'axios';
import axios from "axios";
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'
import Swal from 'sweetalert2/dist/sweetalert2.js';



const Post = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItem] = useState([]);
    const [comment, setComment] = useState([]);
    const [comments, setComments] = useState([]);
    const [nick, setNick] = useState([]);
    const [views, setViews] = useState([]);
    const [visitor, setVisitor] = useState(1);
    const [visitors, setVisitors] = useState([]);
    const [postID, setPostID] = useState(null);
    let [liked, setLiked] = useState([]);
    let [disliked, setDisLiked] = useState([]);
    let [likes, setLikes] = useState(1);
    let [dislikes, setDisLikes] = useState(null);
    let [addedComment, setAddedComment] = useState(false);
    // Initialize an agent at application startup.
    const fpPromise = FingerprintJS.load({
        apiKey: process.env.MIX_FINGERPRINT_API_KEY,
        region: process.env.MIX_FINGERPRINT_REGION
    })
    
    
    let { id } = useParams();
    useEffect(() => {
        // // Get the visitor identifier when you need it.
        fpPromise
        .then(fp => fp.get())
        .then(result => setVisitor(result.visitorId))
        axios.get(`http://127.0.0.1:8000/api/posts/${id}`)
        .then(function (response) {
            // handle success
                setItem(response.data['post'])
                setViews(response.data['views'])
                setPostID(response.data['post']['id'])
                axios.get(`http://127.0.0.1:8000/api/comments/${response.data['post']['id']}`)

                    .then(function (response) {
                        // handle success
                        setLikes(response.data['likes'])
                        setVisitors(response.data['visitors']);
                        setDisLikes(response.data['dislikes'])
                        setIsLoaded(true)
                        setComments(response.data['comments'])
                        
                    })
                    .catch(function (error) {
                        // handle error
                        setError(error)
                        setIsLoaded(true)
                    })
            })
            .catch(function (error) {
                // handle error
                setError(error)
                setIsLoaded(true)
            })

    }, [addedComment]);

    const addComment = (e) => {
        
        const id = e.target.getAttribute('data-id');
        axios.post(`http://127.0.0.1:8000/api/comments`, {
            id: id,
            content: comment,
            nickname: nick
        })
        .then(function (response) {
            setAddedComment(true)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your comment has been added',
                showConfirmButton: false,
                timer: 2000,
                allowOutsideClick: false
            })
        })
        .catch(function (response){
            const err = Object.values(response.response.data.message)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                html:
                    `${err.map(function(el){
                        return `<li className='text-danger'>${el}</li>`
    
                    })}`
              })
        })
        axios.post('http://127.0.0.1:8000/notification', {
            link: `/posts/${item.title.replace(' ', '-')}`,
            content: `${nick} added comment to your post`,
            title: item.title,
            type: 'commentAdded'
        })
        
        
        
    }

    const onChangeComment = (e) => {
        setComment(e.target.value)
    }
    const onChangeNick = (e) => {
        setNick(e.target.value)
    }
    const onClickLike = (e) => {
        let likedArr = [...liked]
        let ind = e.target.getAttribute('data-ind')
        let click = e.target.getAttribute('data-click')
        let comm = e.target.getAttribute('data-id')
        if (click == 'true') {
            e.target.setAttribute('data-click', 'false')
            let index = visitors[comm]['likes'].indexOf(visitor)
            visitors[comm]['likes'].splice(index, 1)
            likedArr.push(ind)
        }
        if (likedArr.includes(ind)) {
            let index = likedArr.indexOf(ind)
            likedArr.splice(index, 1)
            likes[ind].likes--
            axios.post('http://127.0.0.1:8000/api/likes', {
                id: postID,
                type: 'like',
                likes: likes,
                voter: visitor,
                info: 'delete',
                commID: likes[ind]['id']

            })
        } else {
            likedArr.push(ind)
            likes[ind].likes++;
            axios.post('http://127.0.0.1:8000/api/likes', {
                id: postID,
                type: 'like',
                likes: likes,
                voter: visitor,
                info: 'add',
                commID: comm

            })
        }

        setLiked(likedArr)
    }
    const onClickDisLike = (e) => {
        let dislikedArr = [...disliked]
        let ind = e.target.getAttribute('data-ind')
        let click = e.target.getAttribute('data-click')
        let comm = e.target.getAttribute('data-id')
        if (click == 'true') {
            e.target.setAttribute('data-click', 'false')
            let index = visitors[comm]['dislikes'].indexOf(visitor)
            visitors[comm]['dislikes'].splice(index, 1)
            dislikedArr.push(ind)
        }
        if (dislikedArr.includes(ind)) {
            let index = dislikedArr.indexOf(ind)
            dislikedArr.splice(index, 1)
            dislikes[ind].dislikes--
            axios.post('http://127.0.0.1:8000/api/dislikes', {
                id: postID,
                type: 'dislike',
                dislikes: dislikes,
                voter: visitor,
                info: 'delete',
                commID: dislikes[ind]['id']

            })
        } else {
            dislikedArr.push(ind)
            dislikes[ind].dislikes++;
            axios.post('http://127.0.0.1:8000/api/dislikes', {
                id: postID,
                type: 'dislike',
                dislikes: dislikes,
                voter: visitor,
                info: 'add',
                commID: comm

            })
        }
        setDisLiked(dislikedArr)

    }

   if (!isLoaded) {
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
                <div className="row">
                    {(() => {
                        if (typeof (comments) == 'undefined') {
                            return (
                                <div className="card comments">
                                    <div className="card-header text-center">
                                        <h3>Comments</h3>
                                    </div>
                                    <div className="form-floating mt-3">
                                        <input className="form-control comment-nick" placeholder="Leave a nick here" id="floatingTextarea" onChange={onChangeNick} />
                                        <label htmlFor="floatingTextarea" className="comment-label">Put your nick</label>
                                    </div>
                                    <div className="form-floating mt-3">
                                        <textarea className="form-control comment-content" placeholder="Leave a comment here" id="floatingTextarea" onChange={onChangeComment}></textarea>
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
                                <div className="card comments">
                                    <div className="card-header text-center">
                                        <h3>Comments</h3>
                                    </div>
                                    <div className="form-floating mt-3">
                                        <input className="form-control comment-nick" placeholder="Leave a nick here" id="floatingTextarea" maxLength="50" onChange={onChangeNick} />
                                        <label htmlFor="floatingTextarea" className="comment-label">Put your nick</label>
                                    </div>
                                    <div className="form-floating mt-3">
                                        <textarea className="form-control comment-content" placeholder="Leave a comment here" id="floatingTextarea" onChange={onChangeComment}></textarea>
                                        <label htmlFor="floatingTextarea" className="comment-label">Put your comment</label>
                                    </div>
                                    <div className="mt-3">
                                        <button type="button" className="btn btn-outline-light float-end" onClick={addComment} data-id={item.id}>Send</button>
                                    </div>
                                    {comments.map(((comment, index) => (
                                        <div key={comment.id}>
                                            <div className="card-body">
                                                <h5 className="card-title">{comment.nickname}</h5>
                                                <p className="card-text">{comment.content} </p>
                                                
                                                {(() => {
                                                    if (visitors[comment.id]['likes'].includes(visitor) || liked.includes(index.toString())) {
                                                        return (
                                                            <a title="like"><img className="like" src={likeFill} onClick={onClickLike} data-id={comment.id} data-ind={index} data-click={visitors[comment.id]['likes'].includes(visitor)} /><span className="like-text">{likes[index]['likes']}</span></a>
                                                        )

                                                    } else {
                                                        return (
                                                            <a title="like"><img className="like" src={like} onClick={onClickLike} data-id={comment.id} data-ind={index} /><span className="like-text">{likes[index]['likes']}</span></a>
                                                        )
                                                    }

                                                })()}
                                                {(() => {
                                                    if (visitors[comment.id]['dislikes'].includes(visitor) || disliked.includes(index.toString())) {
                                                        return (
                                                            <a title="dislike"><img className="dislike" src={disLikeFill} onClick={onClickDisLike} data-id={comment.id} data-ind={index} data-click={visitors[comment.id]['dislikes'].includes(visitor)} /> <span className="dislike-text">{dislikes[index]['dislikes']}</span></a>
                                                        )

                                                    } else {
                                                        return (
                                                            <a title="dislike"> <img className="dislike" src={dislike} onClick={onClickDisLike} data-id={comment.id} data-ind={index} /> <span className="dislike-text">{dislikes[index]['dislikes']}</span></a>
                                                        )
                                                    }

                                                })()}

                                            </div>
                                            <div className="card-footer text-muted">
                                                {comment.created_at}
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