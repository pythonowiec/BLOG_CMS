<?php

namespace App\Http\Controllers;

use App\Events\CommentAdded;
use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class NotifyController extends Controller
{
    public function index() {
        $notifications = Notification::orderBy('id', 'desc')->get();

        return $notifications;      
    }
    public function send(Request $request){
        $link = (isset($request->title)) ? str_replace(' ', '-', $request->title) : '';
        $notification = Notification::create([
            'content' => $request->content,
            'link' => $link,
            'type' => $request->type,
            'viewed' => '0'
        ]);
        $id = $notification->id;
        event(new CommentAdded($request->content, $link, $id));
        return 'Send';
    }
    public function markAsViewed(Request $request){
        if($request->id == 'all'){
            DB::table('notifications')
                ->update([
                    'viewed' => '1'
                ]);
        }else{
            DB::table('notifications')
                ->where('id', $request->id)
                ->update([
                    'viewed' => '1'
                ]);
        }
    }
    public function getNotViewed(){
        $notifications = Notification::where('viewed', 0)->get();
        $count = count($notifications);
        return response()->json($count, 200);
    }
}
