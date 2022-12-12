import { divide } from "lodash";
import React, { useState, useEffect } from "react";
import ReactDOM from "react";
import { Link, useParams } from "react-router-dom";
import img2 from './images/im2.jpg';
import like from './images/like.png';
import likeFill from './images/like-fill.png';
import dislike from './images/dislike.png';
import disLikeFill from './images/dislike-fill.png';
import 'axios';
import { DiscussionEmbed } from 'disqus-react';
import axios from "axios";
import { HandThumbsDown, HandThumbsDownFill, HandThumbsUp, HandThumbsUpFill } from "react-bootstrap-icons";
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'



const Post = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setisLoaded] = useState(false);
    const [item, setItem] = useState([]);
    const [comment, setComment] = useState([]);
    const [comments, setComments] = useState([]);
    const [nick, setNick] = useState([]);
    const [views, setViews] = useState([]);
    const [visitor, setVisitor] = useState(1);
    const [visitors, setVisitors] = useState([]);
    const [postID, setPostID] = useState(null);
    let [liked, setLiked] = useState([1]);
    let [disliked, setDisLiked] = useState([]);
    let [likes, setLikes] = useState(1);
    let [dislikes, setDisLikes] = useState(null);
    let [counter, setCounter] = useState(1);

    // Initialize an agent at application startup.
    const fpPromise = FingerprintJS.load({
        apiKey: "soKkjQsHUsMetzxHgnMT",
        region: "eu"
    })

    // // Get the visitor identifier when you need it.
    fpPromise
        .then(fp => fp.get())
        .then(result => setVisitor(result.visitorId))

    let { id } = useParams();
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/posts/${id}`)
            .then(function (response) {
                // handle success

                setItem(response.data['post'][0])
                setViews(response.data['views'])
                setPostID(response.data['post'][0]['id'])
                axios.get(`http://127.0.0.1:8000/api/comments/${response.data['post'][0]['id']}`)
                
                .then(function (response) {
                    // handle success
                    setLikes(response.data['likes'])
                    setVisitors(response.data['visitors']);
                    setDisLikes(response.data['dislikes'])
                    setisLoaded(true)
                    setComments(response.data['comments'])
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

    const onChangeComment = (e) => {
        setComment(e.target.value)
    }
    const onChangeNick = (e) => {
        setNick(e.target.value) 
    }
    // console.log(visitors);
    const onClickLike = (e) => {
        let likedArr = liked
        let ind = e.target.getAttribute('data-ind')
        let click = e.target.getAttribute('data-click')
        let comm = e.target.getAttribute('data-id')
        counter++
        if(click == 'true'){
            e.target.setAttribute('data-click', 'false')
            let index = visitors[comm]['likes'].indexOf(visitor)
            visitors[comm]['likes'].splice(index, 1)
            likedArr.push(ind)
        }
        if(likedArr.includes(ind)){
            // console.log(e.target.getAttribute('data-id'))
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
        }else{
            // console.log(e.target.getAttribute('data-id'))
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


        setCounter(counter)
       

    }
    const onClickDisLike = (e) => {
        let dislikedArr = disliked
        let ind = e.target.getAttribute('data-ind')
        let click = e.target.getAttribute('data-click')
        let comm = e.target.getAttribute('data-id')
        counter++
        if(click == 'true'){
            e.target.setAttribute('data-click', 'false')
            let index = visitors[comm].indexOf(visitor)
            visitors[comm].splice(index, 1)
            dislikedArr.push(ind)
        }
        if(dislikedArr.includes(ind)){
            // console.log(e.target.getAttribute('data-id'))
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
        }else{
            // console.log(e.target.getAttribute('data-id'))
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
        console.log(disliked)
        console.log(liked)
        setDisLiked(dislikedArr)


        setCounter(counter)
       

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
                    
                    <div className="form-floating">
                        <input className="form-control comment-nick" placeholder="Leave a nick here" id="floatingTextarea" onChange={OnChangeNick} />
                        <label htmlFor="floatingTextarea" className="comment-label">Put your nick</label>
                    </div>
                    <div className="form-floating mt-3">
                        <textarea className="form-control comment-content" placeholder="Leave a comment here" id="floatingTextarea" onChange={OnChangeComment}></textarea>
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
                                    {comments.map(( (comment, index) => (
                                        <div key={comment.id}>
                                            <div className="card-body">
                                                <h5 className="card-title">{comment.nickname}</h5>
                                                <p className="card-text">{comment.content} </p>
                                                {(() => {
                                                    if (visitors[comment.id]['likes'].includes(visitor) || liked.includes(index.toString())) {
                                                        return(
                                                            <a><img className="like" src={likeFill}  onClick={onClickLike} data-id={comment.id} data-ind={index} data-click={visitors[comment.id]['likes'].includes(visitor)}/><span className="like-text">{likes[index]['likes']}</span></a>
                                                            )
                                                            
                                                        } else {
                                                            return(
                                                                <a><img className="like" src={like}  onClick={onClickLike}  data-id={comment.id} data-ind={index}/><span className="like-text">{likes[index]['likes']}</span></a>
                                                        )
                                                    }

                                                })()}
                                                {(() => {
                                                    if (visitors[comment.id]['dislikes'].includes(visitor) || disliked.includes(index.toString())) {
                                                        return(
                                                            <a><img className="dislike" src={disLikeFill}  onClick={onClickDisLike} data-id={comment.id} data-ind={index} data-click={visitors[comment.id]['dislikes'].includes(visitor)}/> <span className="dislike-text">{dislikes[index]['dislikes']}</span></a>
                                                            )
                                                            
                                                        } else {
                                                            return(
                                                            <a> <img className="dislike" src={dislike}  onClick={onClickDisLike} data-id={comment.id} data-ind={index}/> <span className="dislike-text">{dislikes[index]['dislikes']}</span></a>
                                                        )
                                                    }

                                                })()}
                                                
                                            </div>
                                            <div className="card-footer text-muted">
                                                {counter} days ago
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