import React, { useState, useEffect } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from "react-router-dom";
import { Bell } from 'react-bootstrap-icons'
import Pusher from 'pusher-js';
import axios from "axios";
import { get } from "lodash";

function Navigation() {
    const {
        isLoading,
        isAuthenticated,
        error,
        user,
        loginWithRedirect,
        logout,
    } = useAuth0();
    const [notifications, setNotifications] = useState([]);
    const [countNotViewed, setCountNotViewed] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/notviewed')
            .then(function (response) {
                setCountNotViewed(response.data)
            })
            .catch(function (error) {
            })
    }, []);
    
    const markAsViewed = (id) => {
        axios.post('http://127.0.0.1:8000/viewed', {
            id: id
        })
    }
    const getNotifications = () => {
        axios.get('http://127.0.0.1:8000/notifications')
        .then(function (response) {
            setNotifications(response.data)
        })
        .catch(function (error) {
        })
    }
    const getNotificationsNotViewed = () => {
        axios.get('http://127.0.0.1:8000/notviewed')
        .then(function (response) {
            setCountNotViewed(response.data)
        })
        .catch(function (error) {
        })
    }

    const handleBellClick = (e) => {
        getNotifications()
        getNotificationsNotViewed()

    }
    const handleNotifyClick = (e) => {
        const id = e.target.getAttribute('data-id')
        markAsViewed(id)
        getNotifications()
        getNotificationsNotViewed()
    }
    const handleMarkClick = (e) => {
        markAsViewed('all')
        getNotificationsNotViewed()
        
    }
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
                                    <Bell className="notification-icon" />
                                    {(() => {
                                        if (countNotViewed != '0') {
                                            return (
                                                <span className="badge rounded-pill badge-notification bg-danger">{countNotViewed}</span>
                                            )
                                        } else {
                                            return (
                                                <span className="badge rounded-pill badge-notification bg-danger d-none">{countNotViewed}</span>

                                            )
                                        }
                                    })()}
                                </a>

                                <div className="dropdown-menu dropdown-menu-dark dropdown-notifications">
                                    <ul className="dropdown-toolbar">
                                        <div className="dropdown-toolbar-actions">
                                            <a onClick={handleMarkClick} href="#">Mark all as read</a>
                                        </div>
                                        <h3 className="dropdown-toolbar-title">Notifications (<span className="notif-count">{notifications.length}</span>)</h3>
                                        {notifications.map((notification, index) => (

                                            <li className="dropdown-item" key={index}><a onClick={handleNotifyClick} href={`http://127.0.0.1:8000/posts/${notification.link}`}>{notification.viewed == '0' ? <strong data-id={notification.id}>{notification.content}</strong> : <span>{notification.content}</span>}</a></li>


                                        ))}


                                    </ul>
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
                                        <button className='btn btn-outline-light' onClick={() => logout({ returnTo: window.location.origin })}>
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
export default Navigation;