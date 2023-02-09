import { Profile } from "../models/profile.js";
import { DirectMessage } from "../models/directMessage.js";

const index = async (req, res) => {
  try {
    const directMessages = await DirectMessage.find({})
    .populate('members')
    .sort({ createdAt: "desc" });
    res.status(200).json(directMessages)
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

const show = async (req, res) => {
  try {

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

const create = async (req, res) => {
  try {
    req.body.members = [req.user.profile, req.body.profile]
    const directMessage = await DirectMessage.create(req.body)
    const userProfile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { messages: directMessage } },
      { new: true }
    )
    const otherMemberProfile = await Profile.findByIdAndUpdate(
      req.body.profile,
      { $push: { messages: directMessage } },
      { new: true }
    )
    directMessage.members = [req.user.profile, req.body.profile]
    res.status(201).json(directMessage)
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export {
  index,
  show, 
  create,
}