const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ✅ Add this
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', postSchema);
