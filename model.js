const mongoose = require("mongoose")

const summarymodal = new mongoose.Schema(
    {
        history:{
        type:Object,
        default:{}
        }
    }
)

module.exports = mongoose.model("summarymodal",summarymodal)