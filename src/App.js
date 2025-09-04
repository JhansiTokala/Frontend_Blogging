import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import Write from './Pages/Write/Write';
import Home from './Pages/Home/Home';
import BlogDetails from './Pages/BlogDetails/BlogDetails';
import UpdatePost from './Pages/UpdatePost/UpdatePost';
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
       <Route path="/write" element={<Write user={user} />} />

        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog/:id" element={<BlogDetails />} /> {/* NEW */}
        <Route path="/update/:id" element={<UpdatePost />} />
      </Routes>
    </Router>
  );
}

export default App;
