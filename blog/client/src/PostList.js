import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const PostList = () => {
  const [posts, setPosts] = useState({});

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:4002/posts");

    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderedPosts = Object.values(posts).map((data) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={data.id}
      >
        <div className="card-body">
          <h3>{data.title}</h3>
          <CommentList comments={data.comments} />
          <CommentCreate postId={data.id} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flax-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};

export default PostList;
