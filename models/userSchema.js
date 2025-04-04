import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: [true, "Email has to be unique"],
        required: [true, 'Email is required']
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._ ]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    biography: {
        type: String,
        default: ''
    },
    endorsement: {
        type: Number,
        default: 0
    },
    endorsedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    image: {
        type: String
    },
    registeredEvents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sessionModels',
        default: []
    }],
    rank: {
        type: Number,
        default: 0
    }
})

const User = mongoose.models.User || mongoose.model("User", profileSchema)

export default User