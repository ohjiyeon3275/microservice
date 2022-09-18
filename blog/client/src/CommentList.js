import React from "react";

const CommentList = ({ comments }) => {
  const renderedComments = comments.map((data) => {
    return <li key={data.id}>{data.content}</li>;
  });

  return <ul> {renderedComments} </ul>;
};

export default CommentList;
