<?php

namespace App\Http\Controllers\API;

use App\User;
use App\Models\Tag;
use App\Models\Post;
use App\Models\Voter;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;  
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = DB::table('posts')
                ->orderBy('created_at', 'desc')
                ->get();
        return response()->json($posts, 200);
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
            'title' => 'required|unique:posts|max:255|required|',
            'image' => 'required|image|mimes:jpg,png,jpeg,gif,svg',
            'tags' => 'required|string|min:1',
        ]);
        if($validation->fails()){
            return response()->json(['message' => $validation->messages()], 500);
           

        }else{
            $img = $request->file('image');
            $file = $img->storeOnCloudinary();
            $idImg = $file->getPublicId();
            
            $post = new Post;
            $post->title = $request->title;
            $post->content = $request->content;
            $post->name = $request->name;
            $post->views = 0; // Assuming the views column is numeric
            $post->image = $idImg;
            $post->save();

            $tagNames = explode(',', $request->tags);
            foreach ($tagNames as $tagName) {
                $tag = new Tag(['name' => $tagName]);
                $post->tags()->save($tag);
            }
            return response()->json(200);

        }


    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($string)
    {  
        if (is_numeric($string)) {
            $post = DB::table('posts')->where('id', $string)->first();
        } else if (is_string($string)) {
            $title = str_replace('-', ' ', $string);
            $post = DB::table('posts')->where('title', $title)->first();
            if ($post) {
                $views = $post->views + 1;
                DB::table('posts')->where('id', $post->id)->update(['views' => $views]);
            }
        }
        return response()->json([
            'post' => $post,
            'views' => $views

        ], 200);
    }

    public function search($search)
    {
        $validator = Validator::make(['search' => $search], [
            'search' => 'string'
        ]);
        
        if ($validator->fails()) {
            abort(404);
        }else {
            $title = str_replace('-', ' ', $search);
            $posts = DB::table('posts')
            ->where('title', 'like', '%'.$search.'%')
            ->get();
        }


        return response()->json([
            'posts' => $posts

        ], 200);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $post = DB::select('select * from posts where id = ?', [$id]);
        return response()->json($post, 200);
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
        $post = Post::find($id);
        $post->title = $request->title;
        $post->content = $request->content;
        $post->image = $id_img;
        $post->save();
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
