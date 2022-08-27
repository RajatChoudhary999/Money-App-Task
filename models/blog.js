// Requiring module
const { uuidv4 } = require("uuidv4");
const mongoose = require("mongoose");

// User Modal Schema
const blogSchema = new mongoose.Schema(
	{
		title: { type: String, default: null },
		body: { type: String, default: null },
		created_date: { type: String },
		updated_date: { type: String },
		_id: { type: String, default: uuidv4 },
	},
	{ strict: false }
);

// Creating model object
const Blog = mongoose.model("blog", blogSchema);

// Exporting our model object
module.exports = {
	Blog,
};
