import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();


// GET all posts
router.get("/", async (req, res) => {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.status(200).json(posts);
});

// GET single post
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  res.status(200).json({ message: "Post found", post });
});


// POST create post
router.post("/", async (req, res) => {
  const { title, content, author } = req.body;

  if (!title || typeof title !== "string" || title.trim().length < 3) {
    return res.status(400).json({
      message: "Title is required and must be at least 3 characters long",
    });
  }
  if (!content || typeof content !== "string" || content.trim().length < 10) {
    return res.status(400).json({
      message: "Content is required and must be at least 10 characters",
    });
  }
  if (!author || typeof author !== "string" || author.trim().length === 0) {
    return res.status(400).json({ message: "Author is required" });
  }

  const newPost = await prisma.post.create({
    data: {
      title: title.trim(),
      content: content.trim(),
      author: author.trim(),
    },
  });

  res.status(201).json({ message: "Post created", newPost });
});

// PATCH update post
router.patch("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  try {
    const updated = await prisma.post.update({
      where: { id },
      data: req.body,
    });
    res.status(200).json({ message: "Post updated", updated });
  } catch {
    res.status(404).json({ message: "Post not found for update" });
  }
});

// DELETE post
router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  try {
    await prisma.post.delete({ where: { id } });
    res.status(200).json({ message: "Post deleted" });
  } catch {
    res.status(404).json({ message: "Post not found for deletion" });
  }
});

export default router;