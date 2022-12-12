<?php

namespace App\Http\Controllers\API;

use App\User;
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
            $post->views = '0';
            $post->image = $idImg;
            $post->save();
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
       
        if(intval($string)){
            $post = DB::select('select * from posts where id = ?', [$string]);

        }
        else if(is_string($string)){
            $title = str_replace('-', ' ', $string);
            $post = DB::select('select * from posts where title = ?', [$title]);
            $views = $post[0]->views + 1;
            $id = $post[0]->id;
            
            DB::table('posts')
            ->where('id', $id)
            ->update([
                'views' => $views
            ]);
        }
        
        // dd($post[0]);
        return response()->json([
            'post' => $post,
            'views' => $views

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

    public function addLike(Request $request)
    {
        $voter = new Voter;
        $voter->post = $request->id;
        $voter->vote = $request->type;
        $voter->visitor = $request->voter;
        $voter->save();
        foreach ($request->likes as $key => $like) {
            dd($like);
            $post = DB::table('comments')
                    ->where('id', $request->id)
                    ->update([
                            'likes' => $request->likes,
    
            ]);
            
        }
        return response()->json(200);
    }
}
