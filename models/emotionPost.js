import mongoose, { Types } from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: {type: String, required: true},
  author: {type: Types.ObjectId, ref: 'Profile'}
})

const reactionSchema = new Schema({
  reactions: {type: String, required: true},
  author: {type: Types.ObjectId}
})

const emotionPostSchema = new Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  author: {type: Types.ObjectId, ref: 'Profile'},
  comments: [commentSchema],
  reactions: [reactionSchema]
},{
  timestamps: true,
})

const EmotionPost = mongoose.model('EmotionPost', emotionPostSchema)

export { EmotionPost }
