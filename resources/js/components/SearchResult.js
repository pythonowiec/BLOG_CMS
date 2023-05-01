import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from "axios";
import Search from "./Search";

const SearchResult = () => {
    let { search } = useParams();
    const [searchResult, setSearchResult] = useState([]);
    const [options, setOptions] = useState({year: 'numeric', month: 'long', day: 'numeric'});
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/posts-search/${search}`)
            .then(function (response) {
                setSearchResult(response.data.posts);
                setIsLoaded(true);
            })
    }, [search]);
    if (!isLoaded) {
        return <div className="loader"></div>;
    } else {
        return (
            <div className='container mt-5'>
                <div className='row mt-3 mb-3'>
                    <div className='col-1'></div>
                    <div className='col-10'><Search param={search} /></div>
                    <div className='col-1'></div>
                </div>
                <div className='row'>
                    <div className='col-1'></div>
                    <div className='col-10'>
                        {searchResult.map(item => (
                            <div className='post' key={item.id}>
                                <Link to={`/posts/${item.title.replace(' ', '-')}`}><img className='img-fluid post-img' src={`https://res.cloudinary.com/dtoiehbpt/image/upload/v1651426819/${item.image}.jpg`} alt="" /></Link>
                                <div className="row">
                                    <p className='title col-6'><Link to={`/posts/${item.title.replace(' ', '-')}`}>{item.title}</Link></p>
                                    <p className='published col-6'>Posted by {item.name} on {new Date(item.created_at).toLocaleDateString('en-EN', options)}</p>
                                </div>
                                <p className="views">{item.views} views</p>
                            </div>
                        ))}
                    </div>
                    <div className='col-1'></div>
                </div>
            </div>
        );
    }
}

export default SearchResult;