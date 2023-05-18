import React, { useState, useEffect } from "react";
import 'axios';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from "react-router-dom";
import axios from "axios";


const Posts = () => {
    const {getAccessTokenSilently} = useAuth0();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false)
    const [items, setItems] = useState([])
    const [id, setId] = useState(0)
    const [options, setOptions] = useState({ 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    }) 
    const [isDone, setIsDone] = useState(false)
    

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/posts")
            .then(function (response) {
                // handle success
                setIsLoaded(true)
                setItems(response.data)

            })
    }, []);
    const handleDelete = async (e) => {
        const id = e.target.getAttribute("data-id")
        const index = e.target.getAttribute("data-index")
        const arr = [...items]
        arr.splice(index, 1)
        console.log(arr)
        
        setItems(arr)
        const token = await getAccessTokenSilently();
        const fd = new FormData()
        const instance = axios.create({
            baseURL: 'http://127.0.0.1:8000/api/',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        instance.delete(`/posts/${id}`)
        .then(function (response) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Post has been deleted',
                showConfirmButton: false,
                timer: 2000,
                allowOutsideClick: false
            })
            
            })
            .catch(function (response) {
                
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            });
            Swal.fire({
                position: 'center',
                title: 'Saving...',
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading()
                    if(isDone == true){
                        Swal.close()
                    }
                }
        })
    }
    let info;
    if(items.length === 0){
        info = <div className="text-white text-center">You dont't have any posts</div>
    }
    if (error) {
        return <div>Błąd: {error.message}</div>;
    } else if (!isLoaded) {
        return <div className="loader"></div>;
    } else {
        return (
            <div className='container mt-5'>
                <div className='row'>
                    <div className="col-10"></div>
                    <div className="col-2">
                    <Link to={'../admin_panel/add/'}><button className='btn btn-secondary float-right'> Add new post</button></Link>

                    </div>
                </div>
                <div className='row mt-3'>
                        <table className="table table-hover table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Views</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index}</th>
                                        <td>{item.title}</td>
                                        <td>{item.image}</td>
                                        <td>{item.views}</td>
                                        <td><Link to={`../admin_panel/edit/${item.id}`}><i className="fa-regular fa-pen-to-square"></i></Link> <i className="fa-regular fa-trash-can delete-btn" onClick={handleDelete} data-id={item.id} data-index={index}></i></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {info}

                </div>
            </div>

        );
    }
}

export default Posts;