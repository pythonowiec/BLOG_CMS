<?php

namespace App\Events;

use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class CommentAdded implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $username;

    public $message;
    
    public $link;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($username, $link)
    {
        $this->username = $username;
        $this->message  = "{$username} add comment";
        $this->link  = "{$link}";
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        return ['comment-added'];
    }
}