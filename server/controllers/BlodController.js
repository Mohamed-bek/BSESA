import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import uploadToSpaces, {
  deleteFromSpaces,
} from "../utitlitis/awsDigitalOcean.js";

export const createBlogPost = async (req, res) => {
  try {
    const { title, content, categories } = req.body;
    const file = req.file;
    if (!file)
      return res.status(404).json({ error: "The Blog Must Have an Image" });
    const thumbnailUrl = await uploadToSpaces(file, "/BlogThumbnails");
    const newPost = new Blog({
      title,
      content,
      categories,
      thumbnailUrl,
    });
    const savedPost = await newPost.save();
    res.status(201).json({ blog: savedPost });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to create post", details: error.message });
  }
};

export const getAllBlogPosts = async (req, res) => {
  try {
    const { page = 1, limit = 20, category, title } = req.query;
    const filter = category ? { categories: category } : {};

    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }

    const blogs = await Blog.find(filter)
      .populate("categories", "name")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const blogsNumber = await Blog.countDocuments(filter);

    res.status(200).json({ blogs, NbofPages: Math.ceil(blogsNumber / limit) });
  } catch (error) {
    res.status(500).json({ err: error.message, details: error });
  }
};

export const getBlogPostById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id ", id);
    const post = await Blog.findById(id)
      .populate("categories", "name")
      .populate({
        path: "comments",
        populate: { path: "author", select: "firstName lastName image" }, // Optional: Populate comment author details
      });

    if (!post) return res.status(404).json({ error: "Post not found" });

    post.views += 1;
    await post.save();

    res.status(200).json({ blog: post });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch post", details: error.message });
  }
};

export const updateBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ error: "Not Found" });

    if (title) blog.title = title;
    if (content) blog.content = content;
    if (req.file) {
      const OldPath = blog.thumbnailUrl;
      const newThumbnailUrl = await uploadToSpaces(req.file, "/BlogThumbnails");
      await deleteFromSpaces(OldPath);
      blog.thumbnailUrl = newThumbnailUrl;
    }
    await blog.save();
    res.status(200).json({ blog });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update post", details: error.message });
  }
};

export const deleteBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Blog.findByIdAndDelete(id);

    if (!deletedPost) return res.status(404).json({ error: "Blog not found" });

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ err: "Failed to delete Blog", details: error });
  }
};

export const toggleLikeBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const blog = await Blog.findById(id);

    if (!blog) return res.status(404).json({ error: "Blog not found" });

    const alreadyLiked = blog.likes.includes(userId);

    if (alreadyLiked) {
      blog.likes = blog.likes.filter(
        (like) => like.toString() !== userId.toString()
      );
      await blog.save();
      return res.status(200).json({ message: "like" });
    } else {
      blog.likes.push(userId);
      await blog.save();
      return res.status(200).json({ message: "unlike" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addCommentToBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const newComment = new Comment({ post: id, author: req.user.id, content });
    const savedComment = await newComment.save();
    const blog = await Blog.findById(id);
    blog.comments.push(savedComment._id);
    await blog.save();
    res.status(201).json({ message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Failed to add comment", details: error });
  }
};

export const deleteCommentFromBlog = async (req, res) => {
  const { id } = req.params;
  const { blogId } = req.query;
  try {
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.comments = blog.comments.filter(
      (comment) => comment._id.toString() !== id
    );
    await blog.save();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
