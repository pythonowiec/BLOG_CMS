import { divide } from "lodash";
import React, { Component } from "react";
import ReactDOM from "react";
import { Link } from "react-router-dom";
import img from './images/im.jpg';
import img2 from './images/im2.jpg';

class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            post: {
                display: 'none',
                id: 0
            },
            id: 0,
            header: [],
            options: { year: 'numeric', month: 'long', day: 'numeric' }
        };
    }

    componentDidMount() {
        fetch("http://127.0.0.1:8000/api/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                    if (result.length > 3) {
                        this.setState({
                            header: result.splice(0, 3),
                        })
                    }
                    else {
                        this.setState({
                            header: []
                        })
                    }
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    render() {
        const { error, isLoaded, post, items, header } = this.state;
        let info;
        
        if (items.length === 0 && header.length === 0) {
            info = <div className="text-white text-center">I dont't published any posts. See You later.</div>
        }

        if (error) {
            return <div>Błąd: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className="loader"></div>;
        } else {
            return (
                <div className='container mt-5'>
                    {(() => {
                        if (header.length >= 3) {
                            return (
                                <div className="row p-0 page-header">
                                    <div className="col-8 col-lg-8 p-0 m-0">
                                        <Link to={`/posts/${header[0].title.replace(' ', '-')}`}>
                                            <div className='header-item'>
                                                <div className='header-image' style={{
                                                    backgroundImage: `url(https://res.cloudinary.com/dtoiehbpt/image/upload/v1651426819/${header[0].image})`
                                                }}></div>
                                                <p className='title-head'>{header[0].title}</p>
                                                <div className='published-head'>Posted by {header[0].name} on {new Date(header[0].created_at).toLocaleDateString('en-EN', this.state.options)}</div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="col-4 p-0 m-0 " >
                                        <Link to={`/posts/${header[1].title.replace(' ', '-')}`}>
                                            <div className='header-item'>
                                                <div className='header-image-s' style={{
                                                    backgroundImage: `url(https://res.cloudinary.com/dtoiehbpt/image/upload/v1651426819/${header[1].image})`
                                                }}></div>
                                                <p className='title-head-s'>{header[1].title}</p>
                                                <div className='published-head-s'>Posted by {header[1].name} on {new Date(header[1].created_at).toLocaleDateString('en-EN', this.state.options)}</div>
                                            </div>
                                        </Link>
                                        <Link to={`/posts/${header[2].title.replace(' ', '-')}`}>
                                            <div className='header-item' >
                                                <div className='header-image-s' style={{
                                                    backgroundImage: `url(https://res.cloudinary.com/dtoiehbpt/image/upload/v1651426819/${header[2].image})`
                                                }}></div>
                                                <p className='title-head-s'>{header[2].title}</p>
                                                <div className='published-head-s'>Posted by {header[2].name} on {new Date(header[2].created_at).toLocaleDateString('en-EN', this.state.options)}</div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div></div>
                            )
                        }
                    })()}
                    <div className='row'>
                        <div className='col-1'></div>
                        <div className='col-10'>
                            {items.map(item => (
                                <div className='post' key={item.id}>
                                    {(() => {
                                        if (item.image != 'test') {
                                            return (
                                                <Link to={`/posts/${item.title.replace(' ', '-')}`}><img className='img-fluid post-img' src={`https://res.cloudinary.com/dtoiehbpt/image/upload/v1651426819/${item.image}.jpg`} alt="" /></Link>
                                            )
                                        } else {
                                            return (
                                                <img className='img-fluid post-img' src={img2} alt="" />
                                            )
                                        }
                                    })()}
                                    <div className="row">
                                        <p className='title col-6'><Link to={`/posts/${item.title.replace(' ', '-')}`}>{item.title}</Link></p>
                                        <p className='published col-6'>Posted by {item.name} on {new Date(item.created_at).toLocaleDateString('en-EN', this.state.options)}</p>
                                    </div>
                                    <p className="views">{item.views} views</p>
                                </div>
                            ))}
                            {info}
                        </div>
                        <div className='col-1'></div>
                    </div>
                </div>

            );
        }
    }
}

export default Posts;