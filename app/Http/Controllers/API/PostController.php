<?php

namespace App\Http\Controllers\API;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;  

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::all();
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
        $validated = $request->validate([
            'title' => 'required|unique:posts|max:255',
            'content' => 'required|',
            'image' => 'required|image|mimes:jpg,png,jpeg,gif,svg'
        ]);
        $img = $request->file('image');
        $file = $img->storeOnCloudinary();
        $id_img = $file->getPublicId();
        $post = new Post;
        $post->title = $request->title;
        $post->content = $request->content;
        $post->name = 'admin';
        $post->views = '0';
        $post->image = $id_img;
        $post->save();
        return response()->json($request->content, 200);


    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($string)
    {   
        if(is_string($string)){
            $title = str_replace('-', ' ', $string);
            $post = DB::select('select * from posts where title = ?', [$title]);
        }
        if(is_numeric($string)){
            $post = DB::select('select * from posts where id = ?', [$string]);
        }
        // dd($post[0]);
        return response()->json($post, 200);
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
    }
}
