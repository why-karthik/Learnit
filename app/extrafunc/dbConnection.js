// connection.js
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/shellhacksDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});

// User schema
const userSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    password: String
});


//course Schema

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model for the instructor
    },
    category: String,
    price: Number,
    enrolledUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model for the enrolled users
    }]
});

// Review schema
const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model for the reviewer
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course", // Reference to the Course model for the reviewed course
    },
    rating: Number,
    comment: String
});

// Create User, Course, and Review models
const User = mongoose.model("User", userSchema);
const Course = mongoose.model("Course", courseSchema);
const Review = mongoose.model("Review", reviewSchema);

module.exports = { User, Course, Review };
