import mongoose, { Types } from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  avatar: String,
  emotionPosts: [{type: Schema.Types.ObjectId, ref: 'EmotionPost'}],
  friendRequests: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
  friends: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
  messages: [{type: Schema.Types.ObjectId, ref: 'DirectMessage'}],
  currentStatus: {type: String, default: 'Excited'}
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
