const dbConnectio = require("../../db");
const posts = require("../models/post");
const postsModel = posts.Model(dbConnectio);
const postsJoiSchema = posts.joiSchema;
const userRepo = require("./user");

const create = async post => {
  const user = await userRepo.getById(post.auther);
  const { error } = validate(post);
  if (error) throw new APIError(400, error);
  return new postsModel(post).save();
};

const update = async (id, post) => {
  const { error } = validate(post);
  if (error) throw new APIError(400, error);
  const user = await userRepo.getById(post.auther);
  const updatedPost = await postsModel.findByIdAndUpdate(id, post, {
    useFindAndModify: false,
    new: true
  });
  if (!updatedPost) throw new APIError(404, "Post Not Found");
  return updatedPost;
};

const getAll = () => {
  return postsModel.find();
};

const get = async id => {
  const foundPost = await postsModel.findById(id);
  if (!foundPost) throw new APIError(404, "Post Not Found");
  return foundPost;
};

const deletePost = async id => {
  const deletedPost = await postsModel.findByIdAndDelete(id, {
    useFindAndModify: false
  });
  if (!deletedPost) throw new APIError(404, "Post Not Found");
  return deletedPost;
};

const pushToPostComments = async (id, commentId) => {
  const post = await postsModel.findByIdAndUpdate(
    id,
    {
      $push: { comments: commentId }
    },
    { useFindAndModify: false, new: true }
  );
  if (!post) throw new APIError(404, "Post Not Found");
  return post;
};

const validate = post => {
  return postsJoiSchema.validate(post);
};

module.exports = {
  create,
  update,
  getAll,
  get,
  pushToPostComments,
  delete: deletePost
};
