import { divide } from "lodash";
import React,  { Component }  from "react";
import ReactDOM  from "react";
import img from './images/im.jpg'
import img2 from './images/im2.jpg'

class Posts extends Component{
    constructor(props) {
        super(props);
        this.state = {
            post: {
                display: 'none',
                id: 0
            }
        }
    }
    id = 'test'
    render(){
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
                    <div className='post' onMouseEnter={ () =>{this.setState({post: {display: 'block', id:'1'}})} } onMouseLeave={()=>{this.setState({post: {display: 'none', id:'1'}})}}>
                            <img className='img-fluid' src={img2} alt=""/>
                            <p className='title'>Ipsum dolor aute elit consequat irure ipsum esse enim excepteur laborum in.</p>
                            <p className='published'>Posted by Start Bootstrap on September 18, 2021</p>
                            {(() => {
                                if (this.state.post['id'] == '1') {
                                    return (
                                        <button className='showBtn'  id="2" style={{display: `${this.state.post['display']}`}}>Show More</button>
                                    )
                                } else {
                                    return (
                                        <button className='showBtn'  id="2" style={{display: `none`}}>Show More</button>
                                    )
                                }
                            })()}
                        </div>
                        <div className='post' onMouseEnter={()=>{this.setState({post: {display: 'block', id:'2'}}); console.log(this.state)}} onMouseLeave={()=>{this.setState({post: {display: 'none', id:'2'}})}}>
                            <img className='img-fluid' src={img2} alt=""/>
                            <p className='title'>Ipsum dolor aute elit consequat irure ipsum esse enim excepteur laborum in.</p>
                            <p className='published'>Posted by Start Bootstrap on September 18, 2021</p>
                            {(() => {
                                if (this.state.post['id'] == '2') {
                                    return (
                                        <button className='showBtn'  id="2" style={{display: `${this.state.post['display']}`}}>Show More</button>
                                    )
                                } else {
                                    return (
                                        <button className='showBtn'  id="2" style={{display: `none`}}>Show More</button>
                                    )
                                }
                            })()}
                        </div>
                    </div>
                    <div className='col-1'></div>
                </div>
            </div>
        )
    }
}

export default Posts;