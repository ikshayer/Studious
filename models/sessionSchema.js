import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({

    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },   
    Location: {
        type: String
    },
    zoomLink: {
        type: String,
        match: [/^https:\/\/zoom\.us\/(j|wc)\/\d+\/?(?:\?pwd=[a-zA-Z0-9]+)?$/, "Please enter a valid link"]
    },
    date:{
        type: String,
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
    }
})

const sessionModel = mongoose.models.sessionModel || mongoose.model('sessionModels', sessionSchema)

export default sessionModel