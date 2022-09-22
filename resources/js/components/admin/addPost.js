import React, { useState, useEffect } from "react";
import { Editor } from '@tinymce/tinymce-react';
import 'axios';
import Swal from "sweetalert2";
import { useAuth0 } from '@auth0/auth0-react';



function AddPost () {
    const {user} = useAuth0();
    const [content, setContent] = useState([]);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [validation, setValidation] = useState([]);

    const onChangeContent = (e) => {
        setContent(e.target.getContent())
    }
    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    }
    const onChangeImage = (e) => {
        const file = e.target.files[0]
        setImage(file)
    }

    const onClick = () =>{
        console.log(image);
        const fd = new FormData()
        if(image){
            fd.append('image', image, image.name)
            fd.append('extension', image.type)

        }
        fd.append('title', title)
        fd.append('content', content)
        fd.append('name', user.name)
        axios.post('http://127.0.0.1:8000/api/posts', fd)
            .then(function (response) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Your post has been saved',
                    showConfirmButton: false,
                    timer: 2000,
                    allowOutsideClick: false
                })
            })
            .catch(function (response) {
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
            });
            Swal.fire({
                position: 'center',
                title: 'Saving...',
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading()
                    if(isLoaded == true){
                        Swal.close()
                    }
                }
            })
    }

    return (
        <div className='container'>
            <div className='row mt-5'>
                <div className='col-1'></div>
                <div className='col-10 '>
                    <input className='form-control w-100 add_input' id='exampleInputEmail1' type='text' placeholder='Title' name='title' onChange={onChangeTitle} required/>
                </div>
                <div className='col-1'></div>
            </div>
            <div className='row mt-5'>
                <div className='col-1'></div>
                <div className='col-10'>
                    <input className='form-control w-100 add_input' id='exampleInputEmail1' type='file' placeholder='Title' name='title' onChange={onChangeImage} required/>
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
                        onChange={onChangeContent}
                    />
                </div>
                <div className='col-1'></div>
            </div>
            <div className='row'>
                <div className='col-1'></div>
                <div className='col-10'>
                    <button className='saveBtn' onClick={onClick}>Save</button>
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

export default AddPost;
