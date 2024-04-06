<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class FeedbackController extends Controller
{
    function index() : Response {
        $feedbacks = Feedback::with('user')->latest()->get();
        return Inertia::render('Feedback/Index', [
            'feedbacks' => $feedbacks,
        ]);        
    }
    function form() : Response {
        return Inertia::render('Feedback/Form');        
    }
    function submit(Request $request) {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'category' => 'required',
        ]); 
        $title = $request->title;
        $description =  $request->description;
        $category = $request->category;
        $user = auth()->user();

        $user->feedbacks()->create([
            'title' => $title,
            'description' => $description,
            'category' => $category,
        ]);

        return redirect()->route('feedback.index');
    }
    function get($id){
        $feedback = Feedback::with('user')->with('comments.user')->findOrFail($id);
        $csrf = csrf_token();
        return Inertia::render('Feedback/Single', ['feedback' => $feedback, 'csrf' => $csrf]);
    }
    function comment(Request $request){
        $request->validate([
            'feedback_id' => 'required',
            'text' => 'required',
        ]);
        $feedback = Feedback::findOrFail($request->feedback_id);
        auth()->user()->comments()->create([
            'feedback_id' => $request->feedback_id,
            'text' => $request->text,
        ]);
        return json_encode([
            'status' => 'success',
            'comments' => $feedback->comments()->with('user')->get()
        ]);
    }
}
