const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const moment = require("moment");
let Port = process.env.PORT || 3000;

const dotenv = require("dotenv");

//Mongoose Schema, connection and functionality
const { Blog } = require("./models/blog");
const { Review } = require("./models/review");
const mongoose = require("mongoose");
const URI = "mongodb://localhost:27017/moneyApp";

dotenv.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connecting to database
mongoose.connect(
	URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (err) throw err;
		console.log("Connected to MongoDB!!!");
	}
);
// ---------------------------------------------------------

//Routers
app.get("/", async (req, res) => {
	res.send("Hello World");
});

app.post("/create_blog", async (req, res) => {
	const { title, body, id } = req.body;
	const createdDate = moment().utc().format("Y-M-D H:M:S");

	//Validate user input
	if (!(title && body && id)) {
		return res.status(400).send("title and body is required");
	}

	let ifIdExist = await Blog.findOne({ _id: id });
	if (ifIdExist) {
		return res.status(409).send("Id already Exist. Enter different Id");
	}

	//Create blog
	const blog = await Blog.create({
		title: title,
		body: body,
		created_date: createdDate,
		_id: id,
	});

	res.status(201).send("Blog created Successfully");
});

app.post("/update_blog", async (req, res) => {
	const { title, body, id } = req.body;
	const updatedDate = moment().utc().format("Y-M-D H:M:S");

	//Validate Input
	if (!(title && body && id)) {
		return res.status(400).send("All inputs are required");
	}

	//Check if Blog with this id Exist
	let blog = await Blog.findOne({ _id: id });
	if (!blog) {
		return res.status(404).send("Blog Not with This Id Not Found");
	}

	await Blog.findOneAndUpdate({ _id: id }, { title: title, body: body });
	await Blog.updateOne(
		{ _id: id },
		{ $set: { updated_date: updatedDate } },
		{ upsert: true }
	);
	res.status(201).send("Blog updated Successfully");
});

app.post("/delete_blog_id", async (req, res) => {
	const { id } = req.body;

	//Validate Input
	if (!id) {
		return res.status(400).send("id is required");
	}

	//Check if Blog with this id Exist
	let blog = await Blog.findOne({ _id: id });
	if (!blog) {
		return res.status(404).send("Blog Not with This Id Not Found");
	}

	//Delete Blog
	await Blog.findByIdAndDelete({ _id: id });
	res.status(201).send("Blog Deleted Successfully");
});

app.get("/get_all_blogs", async (req, res) => {
	let blogs = await Blog.find({});
	return res.send(blogs);
});

app.get("/get_blog_by_id", async (req, res) => {
	const { id } = req.body;

	//Validate Input
	if (!id) {
		return res.status(400).send("id is required");
	}

	let blog = await Blog.findOne({ _id: id });
	if (!blog) {
		return res.status(404).send("Blog Not with This Id Not FOund");
	}
	return res.send(blog);
});

app.post("/post_review", async (req, res) => {
	const { userId, description, reviewId } = req.body;
	const createdDate = moment().utc().format("Y-M-D H:M:S");

	//Validate user input
	if (!(userId && description && reviewId)) {
		return res.status(400).send("All inputs are required");
	}

	//Create review
	const review = await Review.create({
		userId: userId,
		description: description,
		created_date: createdDate,
		_id: reviewId,
	});

	res.status(201).send("Review Added Successfully");
});

app.post("/delete_review", async (req, res) => {
	const { reviewId } = req.body;

	if (!reviewId) {
		return res.status(400).send("Enter Review Id");
	}

	await Review.deleteOne({ _id: reviewId });
	res.status(201).send("Review Deleted Successfully");
});

app.listen(Port, () => {
	console.log(`Server Running on Port ${Port}`);
});
