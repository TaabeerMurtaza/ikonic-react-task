<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Feedback;
use App\Models\User;

class Comment extends Model
{
    use HasFactory;
    protected $fillable = [
        'feedback_id',
        'user_id',
        'text'
    ];

    function feedback(){
        return $this->belongsTo(Feedback::class);
    }
    function user(){
        return $this->belongsTo(User::class);
    }
    
}
