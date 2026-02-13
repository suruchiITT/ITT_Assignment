const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

    _id: {
        type: String,
        required: true
    },

    author: {
        type: String,
        ref: "User",
        required: true
    },

    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    image: {
        type: String,
        default: null
    }

}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);
