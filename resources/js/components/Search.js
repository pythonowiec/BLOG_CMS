import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = (props) => {
    const [searchValue, setSearchValue] = useState(props.param);
    const navigate = useNavigate();

    const handleSearchInputChange = (event) =>{
        setSearchValue(event.target.value);
    };
    const handleSubmitClick = () =>{
        if(searchValue != ''){
            navigate(`/search-result/${searchValue}`);
        }
    };
    return (
        <div className="input-group">
            <input type="search" className="form-control" placeholder="Search" aria-label="Search" aria-describedby="search-addon" value={searchValue} onChange={handleSearchInputChange}/>
            <button type="button" className="btn btn-outline-secondary text-white ml-1" onClick={handleSubmitClick}>search</button>
        </div>
    );
};

export default Search;