import { useAuth0 } from '@auth0/auth0-react';
import { Editor } from '@tinymce/tinymce-react';
import 'axios';
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { useNavigate } from 'react-router-dom';



function AddPost () {
    const {user, getAccessTokenSilently} = useAuth0();
    const [content, setContent] = useState([]);
    const [title, setTitle] = useState('');
    const [inputTagsValue, setInputTagsValue] = useState('');
    const [tags, setTags] = useState([]);  
    const [image, setImage] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedTags, setSelectedTags] = useState([]);
    const [postId, setPostId] = useState([]);
    const navigate = useNavigate();
    
    const onChangeContent = (e) => {
        setContent(e.target.getContent())
    }
    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    }
    const onChangeTags = (e) => {
        setInputTagsValue(e.target.value)
    }
    const onClickTagsAdd = (e) => {
        if (inputTagsValue.replace(/\s/g, '') !== '') {
            setTags([...tags, inputTagsValue]);
            setSelectedTags([...selectedTags, inputTagsValue]);
            setInputTagsValue('');
            
        }
    }
    const onChangeTagsCheckbox = (value) => {
        const isSelected = selectedTags.includes(value);
    
        if (isSelected) {
            setSelectedTags(selectedTags.filter((val) => val !== value));
        } else {
            setSelectedTags([...selectedTags, value]);
        }
    }
    const onChangeImage = (e) => {
        const file = e.target.files[0]
        setImage(file)
    }

    const onClickSaveButton = async () =>{
        const token = await getAccessTokenSilently();
        const fd = new FormData()
        if(image){
            fd.append('image', image, image.name)
            fd.append('extension', image.type)
            
        }
        fd.append('title', title)
        fd.append('content', content)
        fd.append('name', user.name)
        fd.append('tags', selectedTags)
        const instance = axios.create({
            baseURL: 'http://127.0.0.1:8000/api/',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        instance.post('http://127.0.0.1:8000/api/posts', fd)
        .then(function (response) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your post has been saved',
                showConfirmButton: false,
                timer: 2000,
                allowOutsideClick: false
            })
            console.log(response.data.id)
            navigate(`../admin_panel/edit/${response.data.id}`);
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
                        Swal.close();
                        
                    }
                }
            })
    }

    return (
        <div className='container'>
            <div className='row mt-5'>
                <div className='col-1'></div>
                <div className='col-10 '>
                    <input className='form-control w-100 add_input'  type='text' placeholder='Title' name='title' onChange={onChangeTitle} required/>
                </div>
                <div className='col-1'></div>
            </div>
            <div className='row mt-5'>
                <div className='col-1'></div>
                <div className='col-10 '>
                    <input className='form-control w-100 add_input'  type='text' placeholder='Add tag' name='tags' onChange={onChangeTags} required/>
                    <button  className='saveBtn' onClick={onClickTagsAdd}>Add tag</button>
                </div>
                <div className='col-1'></div>
            </div>
            <div className='row mt-5'>
                <div className='col-1'></div>
                <div className='col-10 '>
                        <div className="form-check tags">
                            {tags.length === 0 ? (
                                <p className="tags-mess">Add some tags ;)</p>
                            ) : (
                                <div>
                                    {tags.map((tag, index) => (
                                        <div key={index}>
                                            <input className="form-check-input" type="checkbox" value={tag} checked={selectedTags.includes(tag)} onChange={() => onChangeTagsCheckbox(tag)} id="flexCheckChecked" />
                                            <label  className="form-check-label" htmlFor="flexCheckChecked">
                                                {tag}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                </div>
                <div className='col-1'></div>
            </div>
            <div className='row mt-5'>
                <div className='col-1'></div>
                <div className='col-10'>
                    <input className='form-control w-100 add_input'  type='file' placeholder='Title' name='title' onChange={onChangeImage} required/>
                </div>
                <div className='col-1'></div>
            </div>
            <div className='row mt-5'>
                <div className='col-1'></div>
                <div className='col-10'>
                    <Editor 
                        apiKey={process.env.MIX_EDITOR_API_KEY}
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
                    <button className='saveBtn' onClick={onClickSaveButton}>Save</button>
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
