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
            id: 0
        };
    }

    componentDidMount() {
        console.log(this.props.match.params)
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
            return <div>Ładowanie...</div>;
        } else {
            return (
                <div className='container'>
                    <div className="row p-0 page-header">
                        <div className="col-8 col-lg-8 p-0 m-0">
                            <div className='header-item'>
                                <div className='header-image' style={{
                                    backgroundImage: `url(${img2})`
                                }}></div>
                                <p className='title-head'>Adipisicing velit aliquip exercitation sunt exercitation dolore eadsadsads.</p>
                                <div className='published-head'>Posted by Start Bootstrap on September 18, 2021</div>
                            </div>
                        </div>
                        <div className="col-4 p-0 m-0 " >
                            <div className='header-item'>
                                <div className='header-image-s' style={{
                                    backgroundImage: `url(${img})`
                                }}></div>
                                <p className='title-head-s'>Ipsum dolor aute elit consequat irure ipsum esse enim excepteur laborum in.</p>
                                <div className='published-head-s'>Posted by Start Bootstrap on September 18, 2021</div>
                            </div>
                            <div className='header-item' >
                                <div className='header-image-s' style={{
                                    backgroundImage: `url(${img})`
                                }}></div>
                                <p className='title-head-s'>Ipsum dolor aute elit consequat irure ipsum esse enim excepteur laborum in.</p>
                                <div className='published-head-s'>Posted by Start Bootstrap on September 18, 2021</div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-1'></div>
                        <div className='col-10'>
                            {items.map(item => (
                                <div className='post' key={item.id} onMouseEnter={() => { this.setState({ post: { display: 'block', id: item.id } }) }} onMouseLeave={() => { this.setState({ post: { display: 'none', id: item.id } }) }}>
                                    <img className='img-fluid' src={img2} alt="" />
                                    <p className='title'>{item.title}</p>
                                    <p className='published'>Posted by Start Bootstrap on {item.created_at}</p>
                                    {(() => {
                                        if (post['id'] == item.id) {
                                            return (
                                                <Link to={`/${item.title.replace(' ', '-')}`}><button className='showBtn' onClick={() => { this.setState({ id: item.id }) }}  id={item.id} style={{ display: `${post['display']}` }}>Show More</button></Link>
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