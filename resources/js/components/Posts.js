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
                },
                // Uwaga: to ważne, żeby obsłużyć błędy tutaj, a
                // nie w bloku catch(), aby nie przetwarzać błędów
                // mających swoje źródło w komponencie.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    render() {
        const { error, isLoaded, items, post } = this.state;
        if (error) {
            return <div>Błąd: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className="loader"></div>;
        } else {
            return (
                <div className='container mt-5'>
                    <div className="row p-0 page-header">
                        <div className="col-8 col-lg-8 p-0 m-0">
                            <Link to={`/posts/${items[1].title.replace(' ', '-')}`}>
                                <div className='header-item'>
                                    <div className='header-image' style={{
                                        backgroundImage: `url(https://res.cloudinary.com/dtoiehbpt/image/upload/v1651426819/${items[1].image})`
                                    }}></div>
                                    <p className='title-head'>{items[1].title}</p>
                                    <div className='published-head'>Posted by {items[1].name} on {new Date(items[1].created_at).toLocaleDateString('en-EN', this.state.options)}</div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-4 p-0 m-0 " >
                            <Link to={`/posts/${items[2].title.replace(' ', '-')}`}>
                                <div className='header-item'>
                                    <div className='header-image-s' style={{
                                        backgroundImage: `url(https://res.cloudinary.com/dtoiehbpt/image/upload/v1651426819/${items[2].image})`
                                    }}></div>
                                    <p className='title-head-s'>{items[2].title}</p>
                                    <div className='published-head-s'>Posted by {items[2].name} on {new Date(items[2].created_at).toLocaleDateString('en-EN', this.state.options)}</div>
                                </div>
                            </Link>
                            <Link to={`/posts/${items[3].title.replace(' ', '-')}`}>
                                <div className='header-item' >
                                    <div className='header-image-s' style={{
                                        backgroundImage: `url(https://res.cloudinary.com/dtoiehbpt/image/upload/v1651426819/${items[3].image})`
                                    }}></div>
                                    <p className='title-head-s'>{items[3].title}</p>
                                    <div className='published-head-s'>Posted by {items[3].name} on {new Date(items[3].created_at).toLocaleDateString('en-EN', this.state.options)}</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-1'></div>
                        <div className='col-10'>
                            {items.map(item => (
                                <div className='post' key={item.id} onMouseEnter={() => { this.setState({ post: { display: 'block', id: item.id } }) }} onMouseLeave={() => { this.setState({ post: { display: 'none', id: item.id } }) }}>
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
                                    <p className='title'><Link to={`/${item.title.replace(' ', '-')}`}>{item.title}</Link></p>
                                    <p className='published'>Posted by {item.name} on {new Date(item.created_at).toLocaleDateString('en-EN', this.state.options)}</p>
                                    <p className="views">{item.views} views</p>
                                    {(() => {
                                        if (post['id'] == item.id) {
                                            return (
                                                <Link to={`/posts/${item.title.replace(' ', '-')}`}><button className='showBtn' onClick={() => { this.setState({ id: item.id }) }}  id={item.id} style={{ display: `${post['display']}` }}>Show More</button></Link>
                                            )
                                        } else {
                                            return (
                                                <button className='showBtn' id={item.id} style={{ display: `none` }}>Show More</button>
                                            )
                                        }
                                    })()}
                                </div>
                            ))}
                        </div>
                        <div className='col-1'></div>
                    </div>
                </div>

            );
        }
    }
}

export default Posts;