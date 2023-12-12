const summarymodal = require("./model")

const summarycontroler = {
    historycontroler:async(req,res)=>{

        const {question,summary} = await req.body;

        if (!question || !summary){
            return res.status(403).send({success:"false",messege:"please provide both question and summary"})
        } 

        try {

            let existingSummary = await summarymodal.findOne();
        
            if (existingSummary) {

                existingSummary.history = {
                    ...existingSummary.history,
                    [question]: summary,}

            } else {

              existingSummary = await summarymodal.create({
                history: {
                  [question]: summary,
                },
              });
            }
        
            await existingSummary.save();

            return res.status(200).send({success:"true",messege:"succcessfully added history to history"})

          } catch (error) {
            console.error("Error adding or updating history:", error);
            return res.status(400).send({success:"false",messege:"error adding history"})
          }

    },
    gethistorycontroler: async(req,res)=>{
        try {
            const history = await summarymodal.find()
            res.status(200).send({success:"true",messege:"history fetched successfully",history})
        } catch (error) {
            console.log(error)
            res.status(400).send({success:"false",messege:"error getting the history"})
        }
    }
}

module.exports = summarycontroler;