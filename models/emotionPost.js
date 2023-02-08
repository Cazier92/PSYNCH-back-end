import mongoose, { Types } from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: {type: String, required: true, maxLength: 65},
  author: {type: Schema.Types.ObjectId, ref: 'Profile'}
})

const reactionSchema = new Schema({
  reaction: {type: String, 
    required: true,
    enum: [
      'Like', 'Celebrate', 'Support', 'Funny', 'Love', 'Curious'
    ]
  },
  author: {type: Schema.Types.ObjectId, ref: 'Profile'}
}, {
  timestamps: true,
})

const emotionPostSchema = new Schema({
  emotion: {type: String, 
    required: true,
    enum: [
      // Bad - Let's call this 'Down' to avoid stigmatizing (open to other suggestions): (indigo/violet)
      'Bored', 'Stressed', 'Tired',
      // Fearful: (magenta/pink)
      'Anxious', 'Rejected', 'Scared',
      // Angry: (red)
      'Mad', 'Jealous', 'Betrayed',
      // Disgusted: (orange)
      'Embarrassed', 'Disgusted',
      // Sad: (blue)
      'Lonely', 'Guilty', 'Hurt',
      // Happy: (yellow)
      'Optimistic', 'Peaceful', 'Powerful', 'Accepted', 'Joyful',
      // Surprised: (green)
      'Startled', 'Confused', 'Excited', 'Amazed'

    ]
  },
  content: {type: String, maxLength: 65},
  author: {type: Schema.Types.ObjectId, ref: 'Profile'},
  comments: [commentSchema],
  reactions: [reactionSchema],
  public: {type: Boolean, required: true, default: true}
},{
  timestamps: true,
})

const EmotionPost = mongoose.model('EmotionPost', emotionPostSchema)

export { EmotionPost }
