import mongoose, { Types } from 'mongoose'

const Schema = mongoose.Schema


const notificationSchema = new Schema({
  members: [{type: Schema.Types.ObjectId, ref: 'Profile'}],
  content: String,
  link: String,
},{
  timestamps: true,
})

const Notification = mongoose.model('Notification', notificationSchema)

export { Notification }