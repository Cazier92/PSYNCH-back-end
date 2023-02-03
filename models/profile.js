import mongoose, { Types } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  avatar: String,
  emotionPosts: {type: Schema.Types.ObjectId, ref: 'EmotionPost'},
  friendRequests: [{type: String}],
  friends: {type: Schema.Types.ObjectId, ref: 'Profile'},
  friendCode: {
    type: String,
    default: function() {
      return uuidv4()
    }
  },
  messages: {type: Schema.Types.ObjectId, ref: 'DirectMessage'}
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
