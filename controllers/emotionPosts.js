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
  try {
    const emotionPost = await EmotionPost.findById(req.params.id)
    .populate('author')
    .populate('comments.author')
    res.status(200).json(emotionPost)
  } catch (error) {
    res.status(500).json(error)
  }
}


const feed = async (req, res) => {
  try {
    const currentUser = await Profile.findById(req.params.userId)
    const emotionPosts = await EmotionPost.find({})
    .populate('author')
    console.log(currentUser)
    console.log(emotionPosts)
    const friendPosts = emotionPosts.filter(post => currentUser.friends.includes(post.author._id))
    res.status(200).json(friendPosts)
  } catch (error) {
    res.status(500).json(error)
  }
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
  try {

  } catch (error) {
    res.status(500).json(error)
  }
}

const addReaction = async (req, res) => {
  try {

  } catch (error) {
    res.status(500).json(error)
  }
}

const update = async (req, res) => {
  try {

  } catch (error) {
    res.status(500).json(error)
  }
}

const updateComment = async (req, res) => {
  try {

  } catch (error) {
    res.status(500).json(error)
  }
}

const updateReaction = async (req, res) => {
  try {

  } catch (error) {
    res.status(500).json(error)
  }
}

const deleteEmotionPost = async (req, res) => {
  try {

  } catch (error) {
    res.status(500).json(error)
  }
}

const deleteComment = async (req, res) => {
  try {

  } catch (error) {
    res.status(500).json(error)
  }
}

const deleteReaction = async (req, res) => {
  try {

  } catch (error) {
    res.status(500).json(error)
  }
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