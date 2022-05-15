const { mongoose } = require("mongoose");

const messageSchema = new mongoose.Schema({
//   _id: { type: Number, alise: messageId },
  text:{type:String},
  createdAt:{type:String},
  createdBy:{type:String},
}
);

// messageSchema.plugin(AutoIncrement, { inc_field: "messageId" });
const Message = mongoose.model("messages", messageSchema);
module.exports = Message;
