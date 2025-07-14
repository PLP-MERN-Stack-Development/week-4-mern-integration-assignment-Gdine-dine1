import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(() => navigate('/'));
  }, [id]);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this post?')) {
      await axios.delete(`/api/posts/${id}`);
      navigate('/');
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold">{post.title}</h2>
      <p className="text-gray-600">{post.category?.name}</p>
      <p>{post.content}</p>
      <div className="flex gap-2 mt-4">
        <Link to={`/posts/${post._id}/edit`} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</Link>
        <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
      </div>
    </div>
  );
}

export default SinglePost;
