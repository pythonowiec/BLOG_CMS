import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import 'axios';
import Swal from "sweetalert2";  




export default class AddPost extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.state = {date: new Date(), content: [], title: null, image: null, isLoaded: false}
    }
    onChangeContent(e) {
        this.setState({
            content: e.target.getContent(),
        })
    }
    onChangeTitle(e) {
        this.setState({
            title: e.target.value,
        })
    }
    onChangeImage = (e) => {
        const file = e.target.files[0]
        this.setState({
            image: file
        })
    }

    onClick = () =>{
        console.log(this.state.image);
        const fd = new FormData()
        if(this.state.image){
            fd.append('image', this.state.image, this.state.image.name)
            fd.append('extension', this.state.image.type)

        }
        fd.append('title', this.state.title)
        fd.append('content', this.state.content)
        axios.post('http://127.0.0.1:8000/api/posts', fd)
            .then(function (response) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 2000,
                })
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    footer: '<a href="">Why do I have this issue?</a>'
                  })
            });
            Swal.fire({
                position: 'center',
                title: 'Saving...',
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading()
                    if(this.state.isLoaded == true){
                        Swal.close()
                    }
                }
            })
    }
    render() {
        return (
            <div className='container'>
                <div className='row mt-5'>
                    <div className='col-1'></div>
                    <div className='col-10 '>
                        <input className='form-control w-100 add_input' id='exampleInputEmail1' type='text' placeholder='Title' name='title' onChange={this.onChangeTitle} required/>
                    </div>
                    <div className='col-1'></div>
                </div>
                <div className='row mt-5'>
                    <div className='col-1'></div>
                    <div className='col-10'>
                        <input className='form-control w-100 add_input' id='exampleInputEmail1' type='file' placeholder='Title' name='title' onChange={this.onChangeImage} required/>
                    </div>
                    <div className='col-1'></div>
                </div>
                <div className='row mt-5'>
                    <div className='col-1'></div>
                    <div className='col-10'>
                        <Editor 
                            apiKey='0efkeh4p0498bwsf03d5deorgcjtsaopgw0lvebxnucvfpc5'
                            init={{
                                selector: 'textarea#file-picker',
                                plugins: 'image code textcolor preview   searchreplace autolink autosave save directionality  table charmap hr   nonbreaking   insertdatetime advlist lists   wordcount    textpattern noneditable    quickbars  emoticons ',
                                toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist   | forecolor backcolor  permanentpen removeformat |   | charmap emoticons | image   link | showcomments addcomment',
                                image_title: true,
                                automatic_uploads: true,
                                block_unsupported_drop: false,
                                height: 400,
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }',
                                skin: 'oxide-dark',
                                content_css: 'dark',
                            }}
                            onChange={this.onChangeContent}
                        />
                    </div>
                    <div className='col-1'></div>
                </div>
                <div className='row'>
                    <div className='col-1'></div>
                    <div className='col-10'>
                        <button className='saveBtn' onClick={this.onClick}>Save</button>
                    </div>
                    <div className='col-1'></div>
                </div>

                <div
                    dangerouslySetInnerHTML={{
                        __html: ''
                    }}></div>
            </div>
        )
    }
}