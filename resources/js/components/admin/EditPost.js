import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';
import 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { useAuth0 } from '@auth0/auth0-react';

const EditPost = () =>{
    const {getAccessTokenSilently} = useAuth0();
    const [error, setError] = useState(null);
    const [isLoaded, setisLoaded] = useState(false);
    const [isSaved, setIsSeved] = useState(false);
    const [item, setItem] = useState([]);
    const [post, setPost] = useState([]);
    let { id } = useParams();
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/posts/${id}/edit`)
            .then(function (response) {
                // handle success
                setisLoaded(true)
                setItem(response.data[0])
                setPost(response.data[0])
                
            })
            .catch(function (error) {
                // handle error
                setError(error)
                setisLoaded(true)
            })
            
    }, []);
    
    const onChangeTitle = (e) =>{
        setItem({
            'title': e.target.value,
            'content': item.content,
            'image': item.image
        })
    }
    const onChangeContent = (e) =>{
        setItem({
            'title': item.title,
            'content': e.target.getContent(),
            'image': item.image
        })
    }
    const onChangeImage = (e) =>{   
        setItem({
            'title': item.title,
            'content': item.content,
            'image': e.target.files[0]
        })
    }
    const onClickHandle = async () =>{
        const token = await getAccessTokenSilently();
        const fd = new FormData()
        fd.append("_method", "put");
        fd.append('extension', item.image.type)
        fd.append('title', item.title)
        fd.append('content', item.content)
        if(item.image.name == null){
            fd.append('id_img', item.image)
        }else{
            fd.append('image', item.image, item.image.name)

        }
        const instance = axios.create({
            baseURL: 'http://127.0.0.1:8000/api/',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        instance.post(`/posts/${id}`, fd)
            .then(function (response) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Your work has been saved',
                    showConfirmButton: false,
                    timer: 2000,
                    allowOutsideClick: false
                })
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                  })
            })
            Swal.fire({
                position: 'center',
                title: 'Saving...',
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading()
                    if(isSaved == true){
                        Swal.close()
                    }
                }
            })
    }
    if (error) {
        return <div>Błąd: {error.message}</div>;
    } else if (!isLoaded) {
        return <div className="loader"></div>;
    } else {
        return (
            <div className='container'>
                <div className='row mt-5'>
                    <div className='col-1'></div>
                    <div className='col-10 '>
                        <input className='form-control w-100 add_input' id='exampleInputEmail1' type='text' placeholder='Title' name='title' onChange={onChangeTitle} value={item.title} required/>
                    </div>
                    <div className='col-1'></div>
                </div>
                <div className='row mt-5'>
                    <div className='col-1'></div>
                    <div className='col-10'>
                        <img className='img-fluid' src={`https://res.cloudinary.com/dtoiehbpt/image/upload/v1651426819/${item.image}.jpg`} />
                    </div>
                    <div className='col-1'></div>
                </div>
                <div className='row mt-5'>
                    <div className='col-1'></div>
                    <div className='col-10'>
                        <input className='form-control w-100 add_input' id='exampleInputEmail1' type='file' placeholder='Title' name='title' onChange={onChangeImage}/>
                    </div>
                    <div className='col-1'></div>
                </div>
                <div className='row mt-5'>
                    <div className='col-1'></div>
                    <div className='col-10'>
                        <Editor 
                            apiKey={process.env.MIX_EDITOR_API_KEY}
                            initialValue={post.content}
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
                        <button className='saveBtn' onClick={onClickHandle}>Save</button>
                    </div>
                    <div className='col-1'></div>
                </div>

                <div
                    dangerouslySetInnerHTML={{
                        __html: ''
                    }}></div>
            </div>

        );
    }
}
export default EditPost