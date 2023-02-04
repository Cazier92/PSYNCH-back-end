import mongoose, { Types } from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: {type: String, required: true, maxLength: 65},
  author: {type: Types.ObjectId, ref: 'Profile'}
})

const reactionSchema = new Schema({
  reactions: {type: String, 
    required: true,
    enum: [
      'Like', 'Celebrate', 'Support', 'Funny', 'Love', 'Curious'
    ]
  },
  author: {type: Types.ObjectId, ref: 'Profile'}
}, {
  timestamps: true,
})

const emotionPostSchema = new Schema({
  emotion: {type: String, 
    required: true,
    enum: [
      // Bad - Let's call this 'Down' to avoid stigmatizing (open to other suggestions):
      'Bored', 'Stressed', 'Tired',
      // Fearful:
      'Anxious', 'Rejected', 'Scared',
      // Angry:
      'Mad', 'Jealous', 'Betrayed',
      // Disgusted:
      'Embarrassed', 'Disgusted',
      // Sad:
      'Lonely', 'Guilty', 'Hurt',
      // Happy:
      'Optimistic', 'Peaceful', 'Powerful', 'Accepted', 'Joyful',
      // Surprised:
      'Startled', 'Confused', 'Excited', 'Amazed'

    ]
  },
  content: {type: String, maxLength: 65},
  author: {type: Types.ObjectId, ref: 'Profile'},
  comments: [commentSchema],
  reactions: [reactionSchema],
  public: {type: Boolean, required: true}
},{
  timestamps: true,
})

const EmotionPost = mongoose.model('EmotionPost', emotionPostSchema)

export { EmotionPost }
