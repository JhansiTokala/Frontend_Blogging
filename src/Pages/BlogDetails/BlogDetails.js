import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./BlogDetails.css";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/posts/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="blog-details">
      {blog.image && (
        <img className="blog-image" src={blog.image} alt={blog.title} />
      )}
        <h1>{blog.title}</h1>
        <p className="blog-category">
        <strong>Category:</strong> {blog.category}
        </p>
        <p className="blog-content">{blog.content}</p>

    </div>
  );
};

export default BlogDetails;
