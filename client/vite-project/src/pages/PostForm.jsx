import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch categories and post data if editing
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('/api/categories');
        setCategories(res.data);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setCategories([]);
      }
    };

    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
        setCategory(res.data.category?._id || '');
      } catch (err) {
        console.error('Failed to load post data:', err);
      }
    };

    fetchCategories();
    if (id) fetchPost();
  }, [id]);

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    const payload = { title, content, category };

    try {
      if (id) {
        await axios.put(`/api/posts/${id}`, payload, config);
        alert('✅ Post updated successfully');
      } else {
        await axios.post('/api/posts', payload, config);
        alert('✅ Post created successfully');
      }
      navigate('/home');
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      alert(`❌ Failed to save post: ${msg}`);
      console.error('Save error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-8 space-y-6 bg-white shadow-lg rounded-lg mt-10"
    >
      <h2 className="text-2xl font-bold text-center mb-6">
        {id ? 'Edit Post' : 'Create New Post'}
      </h2>

      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="font-semibold">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Post title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="content" className="font-semibold">Content</label>
        <textarea
          id="content"
          placeholder="Write your content..."
          value={content}
          onChange={e => setContent(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="font-semibold">Category</label>
        <select
          id="category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        >
          <option value="">Select Category</option>
          {categories.length === 0 && <option disabled>No categories available</option>}
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-3 rounded font-semibold hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? 'Saving...' : id ? 'Update Post' : 'Create Post'}
      </button>
    </form>
  );
}

export default PostForm;
