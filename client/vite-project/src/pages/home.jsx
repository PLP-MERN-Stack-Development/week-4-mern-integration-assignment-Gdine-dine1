import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/api/posts');
        if (Array.isArray(res.data)) {
          setPosts(res.data);
        } else {
          console.error('Expected array, got:', res.data);
          setError('Invalid response format');
        }
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading posts...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white/90 rounded-lg shadow-lg p-6 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-800">📚 All Posts</h2>
        <Link
          to="/posts/new"
          className="bg-gradient-to-r from-blue-500 to-pink-500 text-white px-4 py-2 rounded shadow hover:scale-105 transition-transform"
        >
          + New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500 italic">No posts have been published yet.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map(post => (
            <li
              key={post._id}
              className="p-5 border border-blue-100 rounded-lg shadow bg-gradient-to-r from-white to-blue-50 hover:shadow-md transition duration-200"
            >
              <Link to={`/posts/${post._id}`} className="text-xl font-semibold text-blue-700 hover:underline">
                {post.title}
              </Link>

              <p className="text-sm text-gray-600 mt-1">
                {post.category && <span className="text-pink-600">#{post.category.name}</span>}
                {post.user && <> &middot; <span>By {post.user.name || 'Unknown'}</span></>}
              </p>

              <p className="mt-3 text-gray-700 line-clamp-3">
                {post.content.slice(0, 120)}...
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
