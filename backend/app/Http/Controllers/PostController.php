<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PostController extends Controller
{
    public function index()
    {
        return response()->json(Post::latest()->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'slug' => 'nullable|string|unique:posts',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'video' => ['nullable'],
            'video_type' => 'nullable|string',
            'status' => 'required|string',
        ]);

        if (!isset($data['slug']) || empty($data['slug'])) {
            $data['slug'] = Str::slug($data['title']);
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('uploads', 'public');
            $data['image'] = '/storage/' . $path;
        }

        if ($request->hasFile('video')) {
            $request->validate([
                'video' => ['file', 'mimes:mov,mp4,avi,webm,ogg', 'max:102400'],
            ]);
            $path = $request->file('video')->store('uploads', 'public');
            $data['video'] = '/storage/' . $path;
            $data['video_type'] = 'upload';
        } elseif ($request->filled('video') && $request->input('video_type') === 'instagram') {
            $data['video'] = $request->input('video');
        }

        $post = Post::create($data);

        return response()->json($post, 201);
    }

    public function show(Post $post)
    {
        return response()->json($post);
    }

    public function update(Request $request, Post $post)
    {
        $data = $request->validate([
            'title' => 'sometimes|required|string',
            'slug' => 'sometimes|required|string|unique:posts,slug,' . $post->id,
            'content' => 'sometimes|required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'video' => ['nullable'],
            'video_type' => 'nullable|string',
            'status' => 'sometimes|required|string',
        ]);

        if (isset($data['title']) && (!isset($data['slug']) || empty($data['slug']))) {
            $data['slug'] = Str::slug($data['title']);
        }

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('uploads', 'public');
            $data['image'] = '/storage/' . $path;
        }

        if ($request->hasFile('video')) {
            $request->validate([
                'video' => ['file', 'mimes:mov,mp4,avi,webm,ogg', 'max:102400'],
            ]);
            $path = $request->file('video')->store('uploads', 'public');
            $data['video'] = '/storage/' . $path;
            $data['video_type'] = 'upload';
        } elseif ($request->filled('video') && $request->input('video_type') === 'instagram') {
            $data['video'] = $request->input('video');
        }

        $post->update($data);

        return response()->json($post);
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return response()->json(['message' => 'Deleted']);
    }

    public function publicIndex()
    {
        return response()->json(Post::where('status', 'published')->latest()->get());
    }
}
