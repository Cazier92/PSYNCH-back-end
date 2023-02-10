import { Profile } from "../models/profile.js";
import { DirectMessage } from "../models/directMessage.js";

const index = async (req, res) => {
  try {
    const directMessages = await DirectMessage.find({})
    // .populate('members')
    .sort({ createdAt: "desc" });
    res.status(200).json(directMessages)
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

const show = async (req, res) => {
  try {
    const directMessage = await DirectMessage.findById(req.params.id)
    .populate('members')
    .populate('messages')
    .populate('messages.author')
    res.status(200).json(directMessage)
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
    await userProfile.save()
    await otherMemberProfile.save()
    directMessage.members = [req.user.profile, req.body.profile]
    res.status(201).json(directMessage)
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

const sendMessage = async (req, res) => {
  try {
    req.body.author = req.user.profile
    // .populate('author')
    const conversation = await DirectMessage.findById(req.params.id)
    conversation.messages.push(req.body)
    await conversation.save()
    const newMessage = conversation.messages[conversation.messages.length -1]
    
    res.status(201).json(newMessage)
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

const deleteMessage = async (req, res) => {
  try {
    const conversation = await DirectMessage.findById(req.params.conversationId)
    const messageDoc = conversation.messages.id(req.params.messageId)
    if (
      messageDoc.author.equals(req.user.profile)) {
      conversation.messages.remove({ _id: req.params.messageId });
      await conversation.save();
      res.status(200).json(messageDoc);
    } else {
      res
        .status(401)
        .json(
          "Not Authorized: User does not match messageDoc.author"
        );
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}



export {
  index,
  show, 
  create,
  sendMessage,
  deleteMessage,
}