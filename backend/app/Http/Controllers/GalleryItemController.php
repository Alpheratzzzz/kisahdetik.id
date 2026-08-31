<?php

namespace App\Http\Controllers;

use App\Models\GalleryItem;
use Illuminate\Http\Request;

class GalleryItemController extends Controller
{
    public function index()
    {
        return response()->json(GalleryItem::latest()->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'category' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'video' => ['nullable'],
            'video_type' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $data = $validated;

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
        }
        elseif ($request->filled('video') && $request->input('video_type') === 'instagram') {
            $data['video'] = $request->input('video');
        }

        $item = GalleryItem::create($data);

        return response()->json($item, 201);
    }

    public function show(GalleryItem $galleryItem)
    {
        return response()->json($galleryItem);
    }

    public function update(Request $request, GalleryItem $galleryItem)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string',
            'category' => 'sometimes|required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'video' => ['nullable'],
            'video_type' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $data = $validated;

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
        }
        elseif ($request->filled('video') && $request->input('video_type') === 'instagram') {
            $data['video'] = $request->input('video');
        }

        $galleryItem->update($data);

        return response()->json($galleryItem);
    }

    public function destroy(GalleryItem $galleryItem)
    {
        $galleryItem->delete();

        return response()->json(['message' => 'Deleted']);
    }

    public function publicIndex()
    {
        return response()->json(GalleryItem::latest()->get());
    }
}
