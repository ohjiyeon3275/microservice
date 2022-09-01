import { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content: content,
    });

    setContent("");
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>new comment</label>
          <input
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button className="btn btn-primary">Comment submit</button>
        </div>
      </form>
    </>
  );
};

export default CommentCreate;
