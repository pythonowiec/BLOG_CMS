import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from "react-router-dom";

function Navigation (){
    const {
        isLoading,
        isAuthenticated,
        error,
        user,
        loginWithRedirect,
        logout,
      } = useAuth0();
    return(
        <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow-sm">
            <div className="container">

                <Link className='navbar-brand' to={'/'}>MotoBlog</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto">

                    </ul>

                    <ul className="navbar-nav ms-auto">
                       { isAuthenticated &&

                           <li className="nav-item dropdown">
                                <a id="navbarDropdown" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    { user.name }
                                </a>

                                <div className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">
                                    <Link className="dropdown-item" to={'/admin_panel/add'}>Add post</Link>
                                    <Link className="dropdown-item" to={'/admin_panel/posts'}>All posts</Link>
                                    <a className="dropdown-item">
                                        <button className='btn-secondary' onClick={() => logout({ returnTo: window.location.origin })}>
                                            Log out
                                        </button>
                                    </a>
                                </div>
                            </li>
                    }
                    </ul>
                </div>
            </div>
        </nav>
    )
}
export default Navigation;