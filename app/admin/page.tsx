"use client";

import { useEffect, useMemo, useState } from "react";
import api, { setAuthToken } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";

interface PostItem { id?: number; title: string; slug: string; content: string; image?: string; status: string; }
interface GalleryItem { id?: number; title: string; category: string; image?: string; video?: string; video_type?: string; description: string; }
interface TestimonialItem { id?: number; name: string; event: string; quote: string; image?: string; }
type ApiError = {
  response?: {
    status?: number;
    data?: {
      message?: string;
      errors?: Record<string, string[]>;
    };
  };
  message?: string;
};

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return window.localStorage.getItem("admin_token");
  });
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [activeTab, setActiveTab] = useState<"posts" | "gallery" | "testimonials">("posts");

  const [postForm, setPostForm] = useState<PostItem>({ title: "", slug: "", content: "", status: "published" });
  const [galleryForm, setGalleryForm] = useState<GalleryItem>({ title: "", category: "Wedding", image: "", video: "", video_type: "", description: "" });
  const [testimonialForm, setTestimonialForm] = useState<TestimonialItem>({ name: "", event: "", quote: "", image: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingType, setEditingType] = useState<"posts" | "gallery" | "testimonials" | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const loadData = async (authToken: string) => {
    setAuthToken(authToken);

    try {
      const [postsRes, galleryRes, testimonialsRes] = await Promise.all([
        api.get("/posts"),
        api.get("/gallery-items"),
        api.get("/testimonials"),
      ]);
      setPosts(postsRes.data);
      setGallery(galleryRes.data);
      setTestimonials(testimonialsRes.data);
      return true;
    } catch (error) {
      const apiError = error as ApiError;
      const status = apiError?.response?.status;
      if (status === 401 || status === 403) {
        localStorage.removeItem("admin_token");
        setToken(null);
        setAuthToken(null);
        setMessage("Sesi kadaluwarsa. Silakan login ulang.");
      } else {
        setMessage("Gagal memuat data admin.");
      }
      return false;
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", { email, password });
      const authToken = res.data.token;
      setToken(authToken);
      setAuthToken(authToken);
      localStorage.setItem("admin_token", authToken);
      const loaded = await loadData(authToken);
      if (loaded) {
        setMessage("Login berhasil");
      } else {
        setMessage("Login berhasil, tetapi gagal memuat data admin.");
      }
    } catch (error) {
      const apiError = error as ApiError;
      const status = apiError?.response?.status;
      const detail = apiError?.response?.data?.message || apiError?.message;
      if (status === 401) {
        setMessage("Login gagal: email atau password salah.");
      } else {
        setMessage(`Login gagal: ${detail ?? "Terjadi kesalahan"}`);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
    setAuthToken(null);
    setMessage("Logout berhasil");
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    const formData = new FormData();

    if (activeTab === "posts") {
      formData.append("title", postForm.title);
      formData.append("slug", postForm.slug);
      formData.append("content", postForm.content);
      formData.append("status", postForm.status);
      if (selectedFile) formData.append("image", selectedFile);

      try {
        if (editingId && editingType === "posts") {
          await api.post(`/posts/${editingId}?_method=PUT`, formData);
        } else {
          await api.post("/posts", formData);
        }
        setMessage("Postingan tersimpan");
      } catch {
        setMessage("Gagal menyimpan postingan");
      }
    }

    if (activeTab === "gallery") {
      formData.append("title", galleryForm.title);
      formData.append("category", galleryForm.category);
      formData.append("description", galleryForm.description);
      if (galleryForm.video && !selectedFile && galleryForm.video_type === "instagram") {
        formData.append("video", galleryForm.video);
      }
      if (galleryForm.video_type) {
        formData.append("video_type", galleryForm.video_type);
      }
      if (selectedFile) {
        if (selectedFile.type.startsWith("video/") || isVideoFile(selectedFile)) {
          formData.append("video", selectedFile);
        } else {
          formData.append("image", selectedFile);
        }
      }

      try {
        if (editingId && editingType === "gallery") {
          await api.post(`/gallery-items/${editingId}?_method=PUT`, formData);
        } else {
          await api.post("/gallery-items", formData);
        }
        setMessage("Galeri tersimpan");
      } catch (error) {
        const apiError = error as ApiError;
        const detail =
          apiError?.response?.data?.message ||
          apiError?.response?.data?.errors?.video?.[0] ||
          "Gagal menyimpan galeri";
        setMessage(`Gagal menyimpan galeri: ${detail}`);
      }
    }

    if (activeTab === "testimonials") {
      formData.append("name", testimonialForm.name);
      formData.append("event", testimonialForm.event);
      formData.append("quote", testimonialForm.quote);
      if (selectedFile) formData.append("image", selectedFile);
      try {
        if (editingId && editingType === "testimonials") {
          await api.post(`/testimonials/${editingId}?_method=PUT`, formData);
        } else {
          await api.post("/testimonials", formData);
        }
        setMessage("Testimoni tersimpan");
      } catch {
        setMessage("Gagal menyimpan testimoni");
      }
    }

    setSelectedFile(null);
    setEditingId(null);
    setEditingType(null);
    await loadData(token);
  };

  const deleteItem = async (type: "posts" | "gallery" | "testimonials", id: number) => {
    if (!token) return;
    try {
      if (type === "posts") await api.delete(`/posts/${id}`);
      if (type === "gallery") await api.delete(`/gallery-items/${id}`);
      if (type === "testimonials") await api.delete(`/testimonials/${id}`);
      setMessage("Item dihapus");
      await loadData(token);
    } catch {
      setMessage("Gagal menghapus item");
    }
  };

  const isVideoFile = (file: File) => {
    return (
      file.type.startsWith("video/") || /\.(mov|mp4|avi|mkv|webm)$/i.test(file.name)
    );
  };

  const startEdit = (
    type: "posts" | "gallery" | "testimonials",
    item: PostItem | GalleryItem | TestimonialItem,
  ) => {
    setEditingType(type);
    setEditingId(item.id ?? null);
    if (type === "posts") {
      const postItem = item as PostItem;
      setPostForm({
        title: postItem.title,
        slug: postItem.slug,
        content: postItem.content,
        status: postItem.status,
        image: postItem.image,
      });
      setActiveTab("posts");
    }
    if (type === "gallery") {
      const galleryItem = item as GalleryItem;
      setGalleryForm({
        title: galleryItem.title,
        category: galleryItem.category,
        image: galleryItem.image,
        video: galleryItem.video || "",
        video_type: galleryItem.video_type || "",
        description: galleryItem.description,
      });
      setActiveTab("gallery");
    }
    if (type === "testimonials") {
      const testimonialItem = item as TestimonialItem;
      setTestimonialForm({
        name: testimonialItem.name,
        event: testimonialItem.event,
        quote: testimonialItem.quote,
        image: testimonialItem.image,
      });
      setActiveTab("testimonials");
    }
  };

  useEffect(() => {
    if (!token) {
      setAuthToken(null);
      return;
    }

    setAuthToken(token);

    const initializeSession = async () => {
      try {
        await loadData(token);
      } catch (error) {
        const apiError = error as ApiError;
        const status = apiError?.response?.status;
        if (status === 401 || status === 403) {
          localStorage.removeItem("admin_token");
          setToken(null);
          setAuthToken(null);
          setMessage("Sesi admin tidak valid. Silakan login ulang.");
        } else {
          setMessage("Sesi gagal dimuat. Coba lagi nanti.");
        }
      }
    };

    void initializeSession();
  }, [token]);

  const summary = useMemo(() => ({ posts: posts.length, gallery: gallery.length, testimonials: testimonials.length }), [posts.length, gallery.length, testimonials.length]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] px-4 py-10 text-[#F5F5F5] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#C9A227]">Admin Dashboard</p>
            <h1 className="font-serif text-3xl sm:text-4xl">Kelola konten website</h1>
          </div>
          {token ? <Button variant="outline" onClick={handleLogout}>Logout</Button> : null}
        </div>

        {!token ? (
          <Card className="max-w-xl border-[#C9A227]/20">
            <CardContent className="space-y-4 p-6">
              <h2 className="font-serif text-2xl">Login Admin</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <Button type="submit" className="w-full">Masuk</Button>
              </form>
              {message ? <p className="text-sm text-[#C9A227]">{message}</p> : null}
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="border-[#C9A227]/20"><CardContent className="p-6"><p className="text-sm text-[#F5F5F5]/70">Postingan</p><p className="mt-2 text-3xl font-semibold text-[#C9A227]">{summary.posts}</p></CardContent></Card>
              <Card className="border-[#C9A227]/20"><CardContent className="p-6"><p className="text-sm text-[#F5F5F5]/70">Gallery</p><p className="mt-2 text-3xl font-semibold text-[#C9A227]">{summary.gallery}</p></CardContent></Card>
              <Card className="border-[#C9A227]/20"><CardContent className="p-6"><p className="text-sm text-[#F5F5F5]/70">Testimoni</p><p className="mt-2 text-3xl font-semibold text-[#C9A227]">{summary.testimonials}</p></CardContent></Card>
            </div>

            <div className="flex flex-wrap gap-3">
              {([['posts','Postingan'], ['gallery','Gallery'], ['testimonials','Testimoni']] as const).map(([key,label]) => (
                <button key={key} onClick={() => setActiveTab(key)} className={`rounded-full px-4 py-2 text-sm ${activeTab === key ? 'bg-[#C9A227] text-[#0A0A0A]' : 'border border-white/10 text-[#F5F5F5]'}`}>
                  {label}
                </button>
              ))}
            </div>

            <Card className="border-[#C9A227]/20">
              <CardContent className="space-y-6 p-6">
                <form onSubmit={submitForm} className="space-y-4">
                  {activeTab === "posts" ? (
                    <>
                      <Input value={postForm.title} onChange={(e) => setPostForm({ ...postForm, title: e.target.value })} placeholder="Judul postingan" />
                      <Input value={postForm.slug} onChange={(e) => setPostForm({ ...postForm, slug: e.target.value })} placeholder="Slug" />
                      <Textarea value={postForm.content} onChange={(e) => setPostForm({ ...postForm, content: e.target.value })} placeholder="Konten" />
                      <Select value={postForm.status} onChange={(e) => setPostForm({ ...postForm, status: e.target.value })}>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                      </Select>
                      <Input type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                    </>
                  ) : null}

                  {activeTab === "gallery" ? (
                    <>
                      <Input value={galleryForm.title} onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })} placeholder="Judul gambar" />
                      <Select value={galleryForm.category} onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}>
                        <option value="Wedding">Wedding</option>
                        <option value="Event">Event</option>
                        <option value="Grad">Grad</option>
                      </Select>
                      <Textarea value={galleryForm.description} onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })} placeholder="Deskripsi" />
                      <Input value={galleryForm.video || ""} onChange={(e) => setGalleryForm({ ...galleryForm, video: e.target.value, video_type: e.target.value ? "instagram" : "" })} placeholder="URL video Instagram / video" />
                      <Input type="file" accept="image/*,video/*" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                    </>
                  ) : null}

                  {activeTab === "testimonials" ? (
                    <>
                      <Input value={testimonialForm.name} onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })} placeholder="Nama" />
                      <Input value={testimonialForm.event} onChange={(e) => setTestimonialForm({ ...testimonialForm, event: e.target.value })} placeholder="Jenis acara" />
                      <Textarea value={testimonialForm.quote} onChange={(e) => setTestimonialForm({ ...testimonialForm, quote: e.target.value })} placeholder="Kutipan" />
                      <Input type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                    </>
                  ) : null}

                  <Button type="submit" className="relative z-10">Simpan</Button>
                </form>
                {message ? <p className="text-sm text-[#C9A227]">{message}</p> : null}
              </CardContent>
            </Card>

            <div className="space-y-4">
              {activeTab === "posts" ? posts.map((item) => (
                <Card key={item.id} className="border-white/10">
                  <CardContent className="flex flex-wrap items-center justify-between gap-4 p-6">
                    <div>
                      <h3 className="font-serif text-xl">{item.title}</h3>
                      <p className="text-sm text-[#F5F5F5]/70">{item.status}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => startEdit("posts", item)}>Edit</Button>
                      <Button variant="outline" onClick={() => deleteItem("posts", item.id!)}>Hapus</Button>
                    </div>
                  </CardContent>
                </Card>
              )) : null}

              {activeTab === "gallery" ? gallery.map((item) => (
                <Card key={item.id} className="border-white/10">
                  <CardContent className="flex flex-wrap items-center justify-between gap-4 p-6">
                    <div>
                      <h3 className="font-serif text-xl">{item.title}</h3>
                      <p className="text-sm text-[#F5F5F5]/70">{item.category}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => startEdit("gallery", item)}>Edit</Button>
                      <Button variant="outline" onClick={() => deleteItem("gallery", item.id!)}>Hapus</Button>
                    </div>
                  </CardContent>
                </Card>
              )) : null}

              {activeTab === "testimonials" ? testimonials.map((item) => (
                <Card key={item.id} className="border-white/10">
                  <CardContent className="flex flex-wrap items-center justify-between gap-4 p-6">
                    <div>
                      <h3 className="font-serif text-xl">{item.name}</h3>
                      <p className="text-sm text-[#F5F5F5]/70">{item.event}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => startEdit("testimonials", item)}>Edit</Button>
                      <Button variant="outline" onClick={() => deleteItem("testimonials", item.id!)}>Hapus</Button>
                    </div>
                  </CardContent>
                </Card>
              )) : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
