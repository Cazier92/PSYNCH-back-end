import { Profile } from '../models/profile.js'
import { v2 as cloudinary } from 'cloudinary'
import { EmotionPost } from '../models/emotionPost.js'

function index(req, res) {
  Profile.find({})
  .then(profiles => res.json(profiles))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

function addPhoto(req, res) {
  const imageFile = req.files.photo.path
  Profile.findById(req.params.id)
  .then(profile => {
    cloudinary.uploader.upload(imageFile, {tags: `${req.user.email}`})
    .then(image => {
      profile.photo = image.url
      profile.save()
      .then(profile => {
        res.status(201).json(profile.photo)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  })
}

const friendsIdx = async (req, res) => {
  try {
    const userProfile = await Profile.findById(req.user.profile)
    .populate('friends')
    const friends = userProfile.friends
    res.status(200).json(friends)
  } catch (error) {
    res.status(500).json(error)
  }
}

const friendRequests = async (req, res) => {
  try {
    const userProfile = await Profile.findById(req.user.profile)
    .populate('friendRequests')
    const friendRequests = userProfile.friendRequests
    res.status(200).json(friendRequests)
  } catch (error) {
    res.status(500).json(error)
  }
}

const sendFriendRequest = async (req, res) => {
  try {
    const friendProfile = await Profile.findById(req.params.id)
    const userProfile = await Profile.findById(req.user.profile)
    if (friendProfile.equals(userProfile)) {
      res.status(401).json('Cannot send friend request to self')
    } else if (friendProfile.friendRequests.includes(userProfile._id)) {
      res.status(401).json('Cannot send multiple requests')
    } else {
      friendProfile.friendRequests.push(userProfile)
      await friendProfile.save()
      res.status(200).json(friendProfile)
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

const acceptRequest = async (req, res) => {
  try {
    const userProfile = await Profile.findByIdAndUpdate(
      req.user.profile,
      {$push: {friends: req.params.id}},
      {new: true})
    const friendProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      {$push: {friends: req.user.profile}},
      {new: true})
    userProfile.friendRequests.remove({_id: req.params.id})
    await userProfile.save()
    res.status(200).json(friendProfile)
  } catch (error) {
    res.status(500).json(error)
  }
}

const denyRequest = async (req, res) => {
  try {
    const userProfile = await Profile.findById(req.user.profile)
    userProfile.friendRequests.remove({_id: req.params.id})
    await userProfile.save()
    res.status(200).json(userProfile)
  } catch (error) {
    res.status(500).json(error)
  }
}

const show = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id)
    .populate('emotionPosts')
    // .populate('author')
    .populate('friends')
    .populate('friendRequests')
    res.status(200).json(profile)
  } catch (error) {
    res.status(500).json(error)
  }
}

// const updateProfile = async (req, res) => {
//   try {
//     const profile = await Profile.findByIdAndUpdate(
//       req.user.id,
//       req.body,
//       {new: true}
//     )
//       res.status(201).json(profile)
//   } catch (error) {
//     res.status(500).json(error)
//   }
// }



export { 
  index, 
  addPhoto,
  friendsIdx,
  friendRequests,
  sendFriendRequest,
  acceptRequest,
  denyRequest,
  show,
  // updateProfile,
}
