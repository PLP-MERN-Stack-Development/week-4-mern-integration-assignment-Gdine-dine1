import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-extrabold mb-6 text-blue-700 drop-shadow">📝 Make Blogs</h1>
        <p className="mb-8 text-gray-700">Welcome! Please register or log in to continue to the blog platform.</p>
        <div className="flex flex-col gap-4">
          <Link to="/login" className="w-full bg-blue-600 text-white p-3 rounded font-semibold hover:bg-blue-700 transition">Login</Link>
          <Link to="/register" className="w-full bg-pink-500 text-white p-3 rounded font-semibold hover:bg-pink-600 transition">Register</Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
