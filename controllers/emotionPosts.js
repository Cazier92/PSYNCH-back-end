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
    console.log(error, 'Show Controller Error')
    res.status(500).json(error)
  }
}

const feed = async (req, res) => {
  try {
    // const currentUser = await Profile.findById(req.params.userId)
    const profile = await Profile.findById(req.user.profile)
    console.log('profile')
    const emotionPosts = await EmotionPost.find({})
    .populate('author')
    .sort({createdAt: 'desc'})
    // console.log(currentUser)
    // console.log(emotionPosts)
    const friendPosts = emotionPosts.filter(post => profile.friends.includes(post.author._id))
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
    req.body.author = req.user.profile
    const emotionPost = await EmotionPost.findById(req.params.id)
    emotionPost.comments.push(req.body)
    await emotionPost.save()

    const newComment = emotionPost.comments[emotionPost.comments.length -1]

    const profile = await Profile.findById(req.user.profile)
    newComment.author = profile

    res.status(201).json(newComment)
  } catch (error) {
    res.status(500).json(error)
  }
}

const addReaction = async (req, res) => {
  try {
    req.body.author = req.user.profile
    const emotionPost = await EmotionPost.findById(req.params.id)
    emotionPost.reactions.push(req.body)
    await emotionPost.save()

    const newReaction = emotionPost.reactions[emotionPost.reactions.length -1]

    const profile = await Profile.findById(req.user.profile)
    newReaction.author = profile

    res.status(201).json(newReaction)
  } catch (error) {
    res.status(500).json(error)
  }
}

const update = async (req, res) => {
  try {
    const post = await EmotionPost.findById(req.params.id)
    if (post.author.equals(req.user.profile)) {
      const emotionPost = await EmotionPost.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
      ).populate('author')
      res.status(200).json(emotionPost)
    } else {
      res.status(401).json('Not Authorized: User does not match emotionPost.author')
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

const updateComment = async (req, res) => {
  try {
    const post = await EmotionPost.findById(req.params.emotionPostId)
    const commentDoc = post.comments.id(req.params.commentId)
    if (commentDoc.author.equals(req.user.profile)) {
      commentDoc.set(req.body)
      await post.save()

      res.status(201).json(commentDoc)
    } else {
      res.status(401).json('Not Authorized: User does not match commentDoc.author')
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

const updateReaction = async (req, res) => {
  try {
    const post = await EmotionPost.findById(req.params.emotionPostId)
    const reactionDoc = post.reactions.id(req.params.reactionId)
    if (reactionDoc.author.equals(req.user.profile)) {
      reactionDoc.set(req.body)
      await post.save()

      res.status(200).json(reactionDoc)
    } else {
      res.status(401).json('Not Authorized: User does not match reactionDoc.author')
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

const deleteEmotionPost = async (req, res) => {
  try {
    const post = await EmotionPost.findById(req.params.id)
    if (post.author.equals(req.user.profile)) {
      const emotionPost = await EmotionPost.findByIdAndDelete(req.params.id)
      const profile = await Profile.findById(req.user.profile)
      profile.emotionPosts.remove({_id: req.params.id})
      await profile.save()
      res.status(200).json(emotionPost)
    } else {
      res.status(401).json('Not Authorized: User does not match emotionPost.author')
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

const deleteComment = async (req, res) => {
  try {
    const post = await EmotionPost.findById(req.params.emotionPostId)
    const commentDoc = post.comments.id(req.params.commentId)
    if (commentDoc.author.equals(req.user.profile) || post.author.equals(req.user.profile)) {
      post.comments.remove({ _id: req.params.commentId})
      await post.save()
      res.status(200).json(commentDoc)
    } else {
      res.status(401).json('Not Authorized: User does not match emotionPost.author or commentDoc.author')
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

const deleteReaction = async (req, res) => {
  try {
    const post = await EmotionPost.findById(req.params.emotionPostId)
    const reactionDoc = post.reactions.id(req.params.reactionId)
    if (reactionDoc.author.equals(req.user.profile)) {
      post.reactions.remove({_id: req.params.reactionId})
      await post.save()
      res.status(200).json(reactionDoc)
    } else {
      res.status(401).json('Not Authorized: User does not match reactionDoc.author')
    }
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