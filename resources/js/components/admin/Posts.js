import axios from "axios";
import { divide } from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";  


class Posts extends Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind()
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            post: {
                display: 'none',
                id: 0
            },
            id: 0,
            options: { year: 'numeric', month: 'long', day: 'numeric' },
            isDone: false
        };
    }

    componentDidMount() {
        fetch("http://127.0.0.1:8000/api/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
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
    handleDelete(e){
        const id = e.target.getAttribute("data-id")
        const index = e.target.getAttribute("data-index")
        axios.delete(`http://127.0.0.1:8000/api/posts/${id}`)
        .then(function (response) {
            state.isDone = true
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
            console.log(response);
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
                if(this.state.isDone == true){
                    Swal.close()
                }
            }
        })
        this.state.items.splice(index, 1)
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
                    <div className='row'>
                        <div className="col-10"></div>
                        <div className="col-2">
                            <button className='btn btn-secondary float-right'> Add new post</button>

                        </div>
                    </div>
                    <div className='row mt-3'>
                        {/* <div className='col-1'></div>
                        <div className='col-10'> */}
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
                                            <td><Link to={`../admin_panel/edit/${item.id}`}><i className="fa-regular fa-pen-to-square"></i></Link> <i className="fa-regular fa-trash-can" onClick={this.handleDelete} data-id={item.id} data-index={index}></i></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        {/* </div>
                        <div className='col-1'></div> */}
                    </div>
                </div>

            );
        }
    }
}

export default Posts;