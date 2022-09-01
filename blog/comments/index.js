const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

//1개의 postId와 연결되는 comments들을 저장
const commentsByPostId = {};

app.get("/posts/:postId/comments", (req, res) => {
  const postId = req.params;

  res.send(commentsByPostId[postId] || []);
});

app.post("/posts/:postId/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const postId = req.params;

  const comments = commentsByPostId[postId] || [];

  comments.push({ id: commentId, content });

  commentsByPostId[postId] = comments;

  res.status(201).send(comments);
});

app.get("/comments", (req, res) => {
  res.send();
});

app.listen(4001, () => {
  console.log("listening 4001");
});
