import mongoose from "mongoose";

const GistSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  code: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Gist || mongoose.model("Gist", GistSchema);
