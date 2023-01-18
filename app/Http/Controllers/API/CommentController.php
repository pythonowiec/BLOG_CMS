<?php

namespace App\Http\Controllers\API;

use App\User;
use App\Models\Voter;
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
                'nickname' => 'required|max:255|required|',
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
                return response()->json($comment);

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
        $visitors = (object) [];
        $comments = DB::table('comments')
        ->where('post', $id)
        ->get();
        $this->getLikes($id);
        $this->getDislikes($id);
        foreach ($comments as $key => $comment) {
            $this->getVisitors($comment->id);
            $visitors->{$comment->id} = $this->visitors;
            
        }
        return response()->json([
            'comments' => $comments,
            'likes'=> $this->likes,
            'dislikes'=> $this->dislikes,
            'visitors'=> $visitors
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function addLike(Request $request)
    {
        if($request->info == 'add'){
            $voter = new Voter;
            $voter->post = $request->id;
            $voter->vote = $request->type;
            $voter->visitor = $request->voter;
            $voter->comment = $request->commID;
            $voter->save();

        }else{
            DB::table('voters')->where('visitor', $request->voter)->where('post', $request->id)->delete();

        }

        foreach ($request->likes as $key => $like) {
            $post = DB::table('comments')
                    ->where('id', $like['id'])
                    ->update([
                            'likes' => $like['likes'],
    
            ]);
            
        }
        return response()->json(200);
    }
    public function addDislike(Request $request)
    {
        if($request->info == 'add'){
            $voter = new Voter;
            $voter->post = $request->id;
            $voter->vote = $request->type;
            $voter->visitor = $request->voter;
            $voter->comment = $request->commID;
            $voter->save();

        }else{
            DB::table('voters')->where('visitor', $request->voter)->where('post', $request->id)->delete();

        }

        foreach ($request->dislikes as $key => $dislike) {
            $post = DB::table('comments')
                    ->where('id', $dislike['id'])
                    ->update([
                            'dislikes' => $dislike['dislikes'],
    
            ]);
            
        }
        return response()->json(200);
    }

    public function getLikes($id){
        $this->likes = DB::select('select likes, id from comments where post = ?', [$id]);
        return $this->likes;
    }

    public function getDislikes($id){
        $this->dislikes = DB::select('select dislikes, id from comments where post = ?', [$id]);
        return $this->dislikes;
    }
    public function getVisitors($comment){
        $this->visitors = (object) [];
        $records_like = [];
        $records_dislike = [];
        $this->like = DB::select('select comment, visitor from voters where comment = :id and vote = :vote ', ['id'=>$comment, 'vote' => 'like']);
        foreach ($this->like as $key => $value) {
            array_push($records_like, $value->visitor);
        }
        $this->dislike = DB::select('select comment, visitor from voters where comment = :id and vote = :vote ', ['id'=>$comment, 'vote' => 'dislike']);
        foreach ($this->dislike as $key => $value) {
            array_push($records_dislike, $value->visitor);
        }
        $this->visitors->likes = $records_like;
        $this->visitors->dislikes = $records_dislike;
        return $this->visitors;
    }
}


