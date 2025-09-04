import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import './UpdatePost.css';
const UpdatePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: "", content: "" });

  useEffect(() => {
    axios.get(`/api/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`/api/posts/${id}`, post)
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  const handleDelete = () => {
    axios.delete(`/api/posts/${id}`)
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="update-post-container">
      <h2>Update Post</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleChange}
          placeholder="Post Title"
        /><br/>
        <textarea
          name="content"
          value={post.content}
          onChange={handleChange}
          placeholder="Post Content"
        /><br/>
        <button type="submit" className="btn-update">Save Changes</button>
      </form>

      {/* Your actions section */}
      <div className="blog-actions">
        <Link to={`/update/${post._id}`} className="btn-edit">Update</Link>
        <button onClick={handleDelete} className="btn-delete">Delete</button>
      </div>
    </div>
  );
};

export default UpdatePost;
