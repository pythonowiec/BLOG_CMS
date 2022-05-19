import { divide } from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";


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
            return <div>Ładowanie...</div>;
        } else {
            return (
                <div className='container'>
                    <div className='row'>
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
                                    {items.map(item => (
                                        <tr key={item.id}>
                                            <th scope="row">{item.id}</th>
                                            <td>{item.title}</td>
                                            <td>{item.image}</td>
                                            <td>{item.views}</td>
                                            <td><Link to={`edit/${item.id}`}><i className="fa-regular fa-pen-to-square"></i> </Link> <i className="fa-regular fa-trash-can"></i></td>
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