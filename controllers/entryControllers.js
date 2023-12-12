const Entry = require("../models/entryModel")
const cloudinary = require("../helpers/cloudinary")


const createEntry = async (req, res) => {

    const body = req.body
    const urlTitle = body.title.replace(/ /g, "_")
    try {
        let images = [...req.body.images]
        let imagesBuffer = []


        const fileResult = await cloudinary.uploader.upload(body.file, { public_id: urlTitle }, function (error, result) { console.log(result, error); });
        body.file = fileResult.secure_url
        console.log("file", body.file)

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.uploader.upload(images[i], {
                folder: "banners",
                width: 1920,
                crop: "scale"
            });
            imagesBuffer.push({
                public_id: result.public_id,
                url: result.secure_url
            })

        }
        body.images = imagesBuffer;

        const entry = new Entry(body)

        const newEntry = await entry.save();

        //const entry = await Entry.create(body)
        return res.status(201).json({
            ok: true,
            msg: "Entry created",
            data: newEntry,
        });
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Error creating entry",
        });
    }
};

const getAllByUid = async (req, res) => {
    const { uid } = req.params
    try {
        const entries = await Entry.find({ uid });
        if (entries.length == 0) {
            return res.status(404).json({
                ok: false,
                msg: "You don't have any entries"
            });
        } else {
            return res.status(200).json({
                ok: true,
                msg: "Entries retrieved",
                data: entries
            })
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error retrieving entries"
        });
    }
}

const getById = async (req, res) => {
    const { id } = req.params

    try {
        const entry = await Entry.findById(id);

        if (entry) {
            return res.status(200).json({
                ok: true,
                msg: "Entries retrieved",
                data: entry
            })
        }
    } catch (error) {
        return res.status(404).json({
            ok: false,
            msg: "There is no entry with this id"
        });
    }
}



const updateEntry = async (req, res) => {
    const updatedDetails = new Entry(req.body)
    const { _id } = req.body;
    //check if task exists
    const entryExists = await Entry.findOne({
        _id
    });
    try {
        if (!entryExists) {
            return res.status(404).json({
                ok: false,
                msg: "There is no entry with this id"
            });
        } else {

            const updatedEntry = await Entry.findOneAndUpdate(
                { _id },
                { $set: updatedDetails },
                { new: true }
            );
            return res.status(201).json({
                ok: true,
                msg: "Entry updated",
                data: updatedEntry,
            });
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error updating task"
        })
    }
}





const deleteEntry = async (req, res) => {
    const { _id } = req.body

    //check if entry exists
    const entryExists = await Entry.findOne({
        _id
    });

    try {
        if (entryExists) {
            await Entry.findOneAndDelete({ _id })
            return res.status(200).json({
                ok: true,
                msg: "Entry deleted"
            })
        } else {
            return res.status(404).json({
                ok: false,
                msg: "Entry with this id doesn't exist"
            })
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: "Error deleting entry"
        })
    }

}


module.exports = { createEntry, getAllByUid, getById, deleteEntry, updateEntry }