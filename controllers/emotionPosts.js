import { Profile } from "../models/profile.js";
import { EmotionPost } from "../models/emotionPost.js";

const index = async (req, res) => {
  try {
    const emotionPosts = await EmotionPost.find({})
    .populate('author')
    .sort({createdAt: 'desc'})
    res.status(200).json(emotionPosts.filter(post => post.public === true))
  } catch(error) {
    res.status(500).json(error)
  }
}

const show = async (req, res) => {

}

const feed = async (req, res) => {

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

const createComment = async (req, res) => {

}

const addReaction = async (req, res) => {

}

const update = async (req, res) => {

}

const updateComment = async (req, res) => {

}

const updateReaction = async (req, res) => {

}

const deleteEmotionPost = async (req, res) => {

}

const deleteComment = async (req, res) => {

}

const deleteReaction = async (req, res) => {

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