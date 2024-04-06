<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Comment;

class Feedback extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'title',
        'description',
        'category',
    ];

    function user() {
        return $this->belongsTo(User::class);
    }
    function comments() {
        return $this->hasMany(Comment::class);
    }
}
