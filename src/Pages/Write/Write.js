import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Write.css';

const Write = ({ user }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      alert("Please login to write a post.");
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

   const postData = {
     title,
     category,
     content,
     image: imageUrl,
    author: user?.username || 'Anonymous',
};

    try {
      const res = await axios.post('http://localhost:5000/api/posts', postData);
      alert("Post published successfully!");
      navigate('/');
    } catch (err) {
      console.error(err);
      alert("Failed to create post");
    }
  };

  return (
    <div className="write">
      {imageUrl && (
        <img className="write-img" src={imageUrl} alt="preview" />
      )}
      <form className="write-form" onSubmit={handleSubmit}>
        <div className="write-form-group">
          <label>Image URL</label>
          <input
            type="text"
            placeholder="Paste image URL here"
            className="write-input"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <div className="write-form-group">
          <label>Category</label>
          <select
            className="write-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">-- Select a category --</option>
            <option value="Tech">Tech</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Travel">Travel</option>
            <option value="Food">Food</option>
          </select>
        </div>

        <div className="write-form-group">
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter title"
            className="write-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="write-form-group">
          <label>Content</label>
          <textarea
            className="write-input write-text"
            placeholder="Write your blog content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        <button className="write-submit" type="submit">Publish</button>
      </form>
    </div>
  );
};

export default Write;
