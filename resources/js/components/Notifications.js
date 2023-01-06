import React, { useState, useEffect } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { Bell } from 'react-bootstrap-icons'
import Pusher from 'pusher-js';

function Notifications() {

    const [notifications, setNotifications] = useState([]);


    useEffect(() => {
        // Initialize Pusher
        const pusher = new Pusher('fa637878e266219141b4', {
            cluster: 'eu',
            encrypted: true
        });

        // Subscribe to a channel
        const channel = pusher.subscribe('comment-added');

        // Bind to an event on the channel
        channel.bind('App\\Events\\CommentAdded', data => {
            setNotifications([...notifications, data]);
        });

        // Clean up when the component unmounts
        return () => {
            channel.unbind();
            pusher.unsubscribe('comment-added');
        };
    }, [notifications]);
    console.log('Notifications: ', notifications);
    return (
        <div aria-live="polite" aria-atomic="true" className="fixed-top">
            <div className="toast-container top-0 end-0">
                {notifications.map((notification, index) => (
                    <div  className="toast show slide slide-in-right bg-dark"  role="alert" aria-live="assertive" aria-atomic="true"   key={index}>
                        <div className="toast-header">
                            <Bell className="notification-icon rounded me-2" />
                            <strong className="me-auto">Bootstrap</strong>
                            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                        <div className="toast-body">
                            <a href={`http://127.0.0.1:8000/posts/${notification.link}`}>{notification.message}</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Notifications;