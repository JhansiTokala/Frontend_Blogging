import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [recent, setRecent] = useState([]);
  const [byCategory, setByCategory] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const [trRes, allRes] = await Promise.all([
        axios.get('http://localhost:5000/api/posts/trending'),
        axios.get('http://localhost:5000/api/posts'),
      ]);
      setTrending(trRes.data);
      setRecent(allRes.data);

      const categoryMap = {};
      allRes.data.forEach(post => {
        if (!categoryMap[post.category]) categoryMap[post.category] = [];
        categoryMap[post.category].push(post);
      });
      setByCategory(categoryMap);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`http://localhost:5000/api/posts/${id}`);
        fetchPosts(); // Refresh after delete
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update/${id}`);
  };

  return (
    <div className="home-container">
      {/* Trending Blogs */}
      <Section title="🔥 Trending Blogs" items={trending} onDelete={handleDelete} onUpdate={handleUpdate} />

      <hr className="section-divider" />

      {/* Recent Blogs */}
      <Section title="📰 Recent Blogs" items={recent} onDelete={handleDelete} onUpdate={handleUpdate} />

      <hr className="section-divider" />

      {/* Blogs by Category */}
      <div className="home-section">
        <h2>📚 Blogs by Category</h2>
        {Object.entries(byCategory).map(([cat, posts]) => (
          <div key={cat}>
            <h3>{cat}</h3>
            <div className="blog-grid">
              {posts.map(p => (
                <BlogCard key={p._id} post={p} onDelete={handleDelete} onUpdate={handleUpdate} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Section = ({ title, items, onDelete, onUpdate }) => (
  <div className="home-section">
    <h2>{title}</h2>
    <div className="blog-grid">
      {items.map(p => <BlogCard key={p._id} post={p} onDelete={onDelete} onUpdate={onUpdate} />)}
    </div>
  </div>
);

const BlogCard = ({ post, onDelete, onUpdate }) => (
  <div className="blog-card">
    <Link to={`/blog/${post._id}`} className="blog-link">
      {post.image && <img src={post.image} alt={post.title} />}
      <h4>{post.title}</h4>
      <p className="blog-category">{post.category}</p>
    </Link>
    <div className="blog-actions">
      <button className="edit-btn" onClick={() => onUpdate(post._id)}>✏️ Edit</button>
      <button className="delete-btn" onClick={() => onDelete(post._id)}>🗑 Delete</button>
    </div>
  </div>
);

export default Home;
