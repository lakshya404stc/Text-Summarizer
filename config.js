const mongoose = require("mongoose")

const dbconnection = ()=>{
    try {
        mongoose.connect("mongodb://127.0.0.1/text-summarizer")
        .then(()=>{
            console.log("successfully connected to db")
        })
    } catch (error) {

        console.log(`error connecting to db ${error}`)
        
    }
}

module.exports = dbconnection;