const mongoose = require('mongoose');

const CodeSnippetSchema = mongoose.Schema({
  _id: String,
  title: String,
  code: String,
  comments: [String]
});

mongoose.connect('mongodb://localhost/hw08', { useNewUrlParser: true });

module.exports = Post = mongoose.model("CodeSnippet", CodeSnippetSchema);