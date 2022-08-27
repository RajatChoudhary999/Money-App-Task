// Requiring module
const { uuidv4 } = require("uuidv4");
const mongoose = require("mongoose");

// User Modal Schema
const reviewSchema = new mongoose.Schema(
	{
		userId: { type: String, default: null },
		description: { type: String, default: null },
		created_date: { type: String },
		updated_date: { type: String },
		_id: { type: String, default: uuidv4 },
	},
	{ strict: false }
);

// Creating model object
const Review = mongoose.model("review", reviewSchema);

// Exporting our model object
module.exports = {
	Review,
};
