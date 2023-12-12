const express = require("express")
const server = express()
const dbconnection = require("./config")
const summarycontroler = require("./qsumcontroler")
const cors = require("cors")

server.use(cors())
server.use(express.json());

server.post("/api/qsum",summarycontroler.historycontroler)

server.get("/api/gethistory",summarycontroler.gethistorycontroler)


dbconnection()

const PORT = 5050

server.listen(PORT, ()=>{
    console.log(`server running at port ${PORT}`)
})