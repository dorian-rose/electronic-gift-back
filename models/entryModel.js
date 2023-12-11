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
    file: {
        type: String

    },
    password: {
        type: String,

    },
    // pdf: {
    //     type: String,
    // },
    images: [
        {
            public_id: {
                type: String,
            },
            url: {
                type: String
            }
        }
    ],
    date: {
        type: Date, default: Date.now()
    }


})

module.exports = model("Entry", EntrySchema);