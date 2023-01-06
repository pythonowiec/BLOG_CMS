import React, { useState, useEffect } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from "react-router-dom";
import { Bell } from 'react-bootstrap-icons'
import Pusher from 'pusher-js';
import axios from "axios";

function Navigation() {
    const {
        isLoading,
        isAuthenticated,
        error,
        user,
        loginWithRedirect,
        logout,
    } = useAuth0();
    const [isLoaded, setisLoaded] = useState(true);
    const [notifications, setNotifications] = useState([]);

    const handleBellClick = (e) =>{
        axios.get('http://127.0.0.1:8000/notifications')
            .then(function (response) {
                setisLoaded(true)
                setNotifications(response.data)
            })
            .catch(function (error) {
                setisLoaded(true)
            })
}
    if (!isLoaded) {
        return <div className="loader"></div>;
    } else {
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow-sm">
                <div className="container">

                    <Link className='navbar-brand' to={'/'}>MotoBlog</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto">


                        </ul>


                        {isAuthenticated &&
                            <ul className="navbar-nav ms-auto">
                                <li className="dropdown ">
                                    <a href="#notifications-panel" className="btn-link" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onClick={handleBellClick}>
                                        <Bell data-count="1" className="notification-icon" />
                                    </a>

                                    <div className="dropdown-menu  dropdown-menu-dark dropdown-notifications">
                                        <div className="dropdown-toolbar">
                                            <div className="dropdown-toolbar-actions">
                                                <a href="#">Mark all as read</a>
                                            </div>
                                            <h3 className="dropdown-toolbar-title">Notifications (<span className="notif-count">{notifications.length}</span>)</h3>
                                            {notifications.map((notification, index) => (
                                                <li className="dropdown-item" key={index}><a href={`http://127.0.0.1:8000/posts/${notification.link}`}>{notification.content}</a></li>


                                            ))}


                                        </div>
                                        <div className="dropdown-footer text-center">
                                            <a href="#">View All</a>
                                        </div>
                                    </div>
                                </li>

                                <li className="nav-item dropdown">
                                    <a id="navbarDropdown" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {user.name}
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



                            </ul>
                        }
                    </div>
                </div>
            </nav >
        )
    }
}
export default Navigation;