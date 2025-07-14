import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/home';
import PostForm from './pages/PostForm';
import SinglePost from './pages/SinglePost';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const isAuthenticated = Boolean(token);

  return (
    <div className="p-4 max-w-4xl mx-auto bg-gradient-to-br from-blue-50 via-white to-pink-100 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-blue-700 drop-shadow">📝 Make Blogs</h1>

      <Routes>
        {/* ✅ Always show login on / */}
        <Route path="/" element={<Login />} />

        {/* Show register only if not authenticated */}
        <Route
          path="/register"
          element={!isAuthenticated ? <Register /> : <Navigate to="/home" replace />}
        />

        {/* ✅ Protected routes */}
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/" replace />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />}
        />
        <Route
          path="/posts/new"
          element={isAuthenticated ? <PostForm /> : <Navigate to="/" replace />}
        />
        <Route
          path="/posts/:id"
          element={isAuthenticated ? <SinglePost /> : <Navigate to="/" replace />}
        />
        <Route
          path="/posts/:id/edit"
          element={isAuthenticated ? <PostForm /> : <Navigate to="/" replace />}
        />
      </Routes>
    </div>
  );
}

export default App;
