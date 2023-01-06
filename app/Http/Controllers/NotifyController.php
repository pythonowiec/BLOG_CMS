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
        $notifications = Notification::all();
        return $notifications;

    
    }
    public function send(Request $request){
        $link = (isset($request->title)) ? str_replace(' ', '-', $request->title) : '';
        Notification::create([
            'content' => $request->content,
            'link' => $link,
            'type' => $request->type
        ]);
        event(new CommentAdded($request->content, $link));
        return 'Send';
    }
}
