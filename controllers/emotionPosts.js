import { Profile } from "../models/profile.js";
import { EmotionPost } from "../models/emotionPost.js";

function index(req, res) {

}

function show(req, res) {

}

function feed(req, res) {

}

const create = async (req, res) => {
  try {
    req.body.author = req.user.profile
    const emotionPost = await EmotionPost.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      {$push: {emotionPosts: emotionPost}},
      {new: true}
    )
    emotionPost.author = profile
    res.status(201).json(emotionPost)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

function createComment(req, res) {

}

function addReaction(req, res) {

}

function update(req, res) {

}

function updateComment(req, res) {

}

function updateReaction(req, res) {

}

function deleteEmotionPost(req, res) {

}

function deleteComment(req, res) {

}

function deleteReaction(req, res) {

}


export {
  index,
  show,
  feed,
  create,
  createComment,
  addReaction,
  update,
  updateComment,
  updateReaction,
  deleteEmotionPost as delete,
  deleteComment,
  deleteReaction,
}