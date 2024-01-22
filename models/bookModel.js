const mongoose = require("mongoose");
const bookModel = new mongoose.Schema({
    image:{
        type:String,
        required:[true,"Image is required"],
        match: [
            /(https?:\/\/)(www\.?)?([a-zA-Z0-9-]){2,}(\.[a-zA-Z]{2,6})?(\/([a-zA-Z-_\/.0-9#:?=&;,]*)?)?/,
            "Invalid Image URL",
        ],
    },
    name: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Name is required"],
        minLength: [3, "Name must be atleast 3 characters long"],
        maxLength: [20, "Name must not exceed 20 characters"],
    },
    author: String,
    description:String,
    page:Number,
    publication:String,
    prize:Number,
    year:String
      // date: {
        //     type: Date,
        //     default: Date.now,
        // },
},
{
    timestamps:true
});
module.exports = mongoose.model("book", bookModel);