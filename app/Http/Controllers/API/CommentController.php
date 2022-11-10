<?php

namespace App\Http\Controllers\API;

use App\User;
use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;  
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [ 
            'content' => 'required|',
            'nickname' => 'required|unique:comments|max:255|required|',
        ]);
        if($validation->fails()){
            return response()->json(['message' => $validation->messages()], 500);
           

        }else{
            $comment = new Comment;
            $comment->content = $request->content;
            $comment->nickname = $request->nickname;
            $comment->likes = 0;
            $comment->dislikes = 0;
            $comment->post = $request->id;
            $comment->save();
            return response()->json(200);

        }


    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {   
        $comments = DB::table('comments')
        ->where('post', $id)
        ->get();
        
        return response()->json($comments, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        
        $id_img = $request->id_img;
        if($request->file('image')){
            $img = $request->file('image');
            $file = $img->storeOnCloudinary();
            $id_img = $file->getPublicId();
        }
        // $post = Post::find($id);
        // $post->title = $request->title;
        // $post->content = $request->content;
        // $post->image = $request->image;
        // $post->save();

        $post = DB::table('posts')
                ->where('id', $id)
                ->update([
                        'title' => $request->title,
                        'content' => $request->content,
                        'image' => $id_img
        ]);
        return response()->json($post, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post = Post::find($id);
        $post->delete();
        cloudinary()->destroy($post->image);
        return response()->json(200);
    }
}
