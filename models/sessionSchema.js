import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({

    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },   
    location: {
        type: String
    },
    zoomLink: {
        type: String,
        match: [/^https:\/\/(zoom\.us|us05web\.zoom\.us)\/(j|wc)\/\d{9,11}(?:\?pwd=[a-zA-Z0-9]+)?\.\d$/, "Please enter a valid link"],
    },
    date:{
        type: Date,
        required: [true, "Date has to be added"]
    },
    time: {
        type: String,
        required: [true, "Time has to be added"]
    },
    description:{
        type: String,
        required: [true, "Description has to be added"]
    },
    tags: {
        type: Array,
        required: [true, 'A tag has to be added']
    },
    registeredUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }]
})

const sessionModels = mongoose.models.sessionModels || mongoose.model('sessionModels', sessionSchema)

export default sessionModels