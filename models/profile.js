import mongoose, { Types } from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: {type: String, required: true, maxLength: 12},
  photo: {type: String, default: "https://res.cloudinary.com/dmbhhnc2j/image/upload/v1675870453/AdobeStock_349497933_xq1qwl.jpg"},
  emotionPosts: [{type: Schema.Types.ObjectId, ref: 'EmotionPost'}],
  friendRequests: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
  friends: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
  messages: [{type: Schema.Types.ObjectId, ref: 'DirectMessage'}],
  currentStatus: {type: String, default: 'Excited'},
  notifications: [{type: Schema.Types.ObjectId, ref: 'Notification'}]
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
