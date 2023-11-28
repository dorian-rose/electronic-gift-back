const { Schema, model } = require("mongoose");

const EntrySchema = new Schema({
    uid: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String

    },
    password: {
        type: String,

    },
    date: {
        type: Date, default: Date.now()
    }


})

module.exports = model("Entry", EntrySchema);