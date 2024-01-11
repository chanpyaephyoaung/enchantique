import mongoose from "mongoose";

const userNotificationSchema = mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: "User",
      },
      notificationMessage: {
         type: String,
         required: true,
      },
      payload: {
         type: Object,
      },
   },
   { timestamps: true }
);

const UserNotification = mongoose.model("UserNotification", userNotificationSchema);

export default UserNotification;
