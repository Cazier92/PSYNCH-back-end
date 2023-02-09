import mongoose, { Types } from 'mongoose'

const Schema = mongoose.Schema

const messageSchema = new Schema({
  content: {type: String, required: true, maxLength: 65},
  author: {type: Schema.Types.ObjectId, ref: 'Profile'}
})



const directMessageSchema = new Schema({
  members: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
  messages: [messageSchema],
},{
  timestamps: true,
})

const DirectMessage = mongoose.model('DirectMessage', directMessageSchema)

export { DirectMessage }