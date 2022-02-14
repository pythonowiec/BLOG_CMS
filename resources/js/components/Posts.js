import { divide } from "lodash";
import React, { Component } from "react";
import ReactDOM  from "react";
import img from './images/im.jpg'
import img2 from './images/im2.jpg'

class Posts extends Component{
    render(){
        return (
            <div className="row p-0 page-header">
                <div className="col-8 col-lg-8 p-0 m-0">
                    <div className='header-item'>
                        <div className='header-image' style={{
                                backgroundImage: `url(${img})`,
                                height: '40vw',
                                backgroundSize: 'cover'
                            }}></div>
                        <p className='title'>Adipisicing velit aliquip exercitation sunt exercitation dolore eadsadsads.</p>
                        <div className='published'>Posted by Start Bootstrap on September 18, 2021</div>
                    </div>
                </div>
                <div className="col-4 col-lg-4 p-0 m-0 " >
                    <div className='header-item'>
                        <div style={{ 
                                backgroundImage: `url(${img})`,
                                height: '20vw',
                                backgroundSize: 'cover'
                            }}></div>
                        <p className='title-s'>Ipsum dolor aute elit consequat irure ipsum esse enim excepteur laborum in.</p>
                        <div className='published-s'>Posted by Start Bootstrap on September 18, 2021</div>
                    </div>
                    <div className='header-item' >
                        <div style={{ 
                                backgroundImage: `url(${img})`,
                                height: '20vw',
                                backgroundSize: 'cover'
                            }}></div>
                        <p className='title-s'>Ipsum dolor aute elit consequat irure ipsum esse enim excepteur laborum in.</p>
                        <siv className='published-s'>Posted by Start Bootstrap on September 18, 2021</siv>
                    </div>
                </div>
            </div>
        )
    }
}

export default Posts;