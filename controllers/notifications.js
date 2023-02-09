import { Profile } from "../models/profile.js";
import { Notification } from "../models/notification.js";

const index = async (req, res) => {
  try {
    const notifications = await Notification.find({})
    .sort({ createdAt: "desc" });
    res.status(200).json(notifications)
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

const create = async (req, res) => {
  try {
    req.body.members = req.body.profile[0]
    const profile = await Profile.findById(req.body.profile[0])
    req.body.content = `You have a new message from: ${req.user.name}`
    const notification = await Notification.create(req.body)
    const otherMemberProfile = await Profile.findByIdAndUpdate(
      req.body.profile[0],
      { $push: { notifications: notification } },
      { new: true }
    )
    await otherMemberProfile.save()
    notification.members = [req.user.profile, req.body.profile]
    res.status(201).json(notification)
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id)
    const profile = await Profile.findById(req.user.profile)
    profile.notifications.remove({ _id: req.params.id });
      await profile.save();
      res.status(200).json(notification);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}


export {
  index,
  create,
  deleteNotification as delete,
}