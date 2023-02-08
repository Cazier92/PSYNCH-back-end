import mongoose, { Types } from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  photo: {type: String, default: "http://res.cloudinary.com/dmbhhnc2j/image/upload/v1675832170/hpjrbk5pw14swjkkqqjn.svg"},
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
