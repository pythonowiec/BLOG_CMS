/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

 require('./bootstrap');

 /**
  * Next, we will create a fresh React component instance and attach it to
  * the page. Then, you may begin adding components to this application
  * or customize the JavaScript scaffolding to fit your unique needs.
  */
 

import React from 'react';
import ReactDOM from 'react-dom';
import Posts from './components/Posts';
import Post from './components/Post';
import AddPost from './components/admin/addPost';
import EditPost from './components/admin/EditPost';
import AdminPosts from './components/admin/Posts';
import { Route, BrowserRouter, Routes, useNavigate } from 'react-router-dom';
import { Auth0Provider, withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';
import Navigation from './components/Navigation'; 
import Notifications from './components/Notifications'; 

console.log(process.env.MIX_AUTH0_DOMAIN);

const ProtectedRoute = ({ component, ...args }) => {
    const Component = withAuthenticationRequired(component, args);
    return <Component />;
};
const Notify = () =>{
    const { isAuthenticated } = useAuth0()
    return (isAuthenticated ? (
        <Notifications/>
      ): ('') )

    
}
  
const Auth0ProviderWithRedirectCallback = ({ children, ...props }) => {
    const navigate = useNavigate();
    const onRedirectCallback = (appState) => {
        navigate((appState && appState.returnTo) || window.location.pathname);
    };
    return (
        <Auth0Provider onRedirectCallback={onRedirectCallback} {...props}>
        {children}
        </Auth0Provider>
    );
};

ReactDOM.render(
    <BrowserRouter>
          <Auth0ProviderWithRedirectCallback
                domain={process.env.MIX_AUTH0_DOMAIN}
                clientId={process.env.MIX_AUTH0_CLIENT_ID}
                redirectUri={window.location.origin}
                audience={process.env.MIX_AUTH0_AUDIENCE}
              >
                  <Navigation/>
                  <Notify/>
                  <Routes>
                      <Route path="/" element={<Posts />} />
                      <Route path="posts/:id" element={<Post/>} />
                      <Route path="admin_panel/posts" element={<ProtectedRoute component={AdminPosts} />}/>
                      <Route path="admin_panel/add" element={<ProtectedRoute component={AddPost} />}/>
                      <Route path="admin_panel/edit/:id" element={<ProtectedRoute component={EditPost} />}/>
                  </Routes>
          </Auth0ProviderWithRedirectCallback>
      </BrowserRouter>,
   document.querySelector('#app')
);
