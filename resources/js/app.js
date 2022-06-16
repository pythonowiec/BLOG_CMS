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
import Example from './components/Example';
import Posts from './components/Posts';
import Post from './components/Post';
import AddPost from './components/admin/addPost';
import EditPost from './components/admin/EditPost';
import AdminPosts from './components/admin/Posts';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Posts />} />
            <Route path="posts/:id" element={<Post/>} />
            <Route path="admin_panel/posts" element={<AdminPosts/>}/>
            <Route path="admin_panel/add" element={<AddPost/>}/>
            <Route path="admin_panel/edit/:id" element={<EditPost/>}/>
            <Route path="/example" element={<Example/>}/>
        </Routes>
    </BrowserRouter>,
   document.querySelector('#content'));
// ClassicEditor
//     .create( document.querySelector( '#editor' ) )
//     .catch( error => {
//         console.error( error );
