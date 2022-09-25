const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());
app.use(cors());

//1개의 postId와 연결되는 comments들을 저장
const commentsByPostId = {};

app.get("/posts/:postId/comments", (req, res) => {
  const postId = req.params.postId;

  res.send(commentsByPostId[postId] || []);
});

app.post("/posts/:postId/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const postId = req.params.postId;

  const comments = commentsByPostId[postId] || [];

  comments.push({ id: commentId, content, status: "pending" });

  commentsByPostId[postId] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: postId,
      status: "pending",
    },
  });

  res.status(201).send(comments);
});

app.get("/comments", (req, res) => {
  res.send();
});

app.post("/events", async (req, res) => {
  console.log("comment event!!", req.body.type);

  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { id, content, postId, status } = data;

    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => {
      return comment.id === id;
    });

    comment.ststus = status;

    await axios
      .post("http://localhost:4005/events", {
        type: "CommentUpdated",
        data: {
          id,
          content,
          postId,
          status,
        },
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  res.send({});
});

app.listen(4001, () => {
  console.log("listening 4001");
});
