//Import mongoose
// define schema:
//        question:String
//        options: array of objects :[{id, value}]
// 1: Mango                       3. grapes
// 2. Apple                       4. kiwi
//             [{id:1, value="mango"},  {id:2, value:"apple"}]
//        answer: object {id, value}
//export the Model        


const mongoose = require("mongoose")

const questionSchema = new mongoose.Schema({
    question:String,
    options: [{id: Number, value: String}],
    answer:{id:Number, value: String}
})

module.exports = mongoose.models?.Question || mongoose.model("Question", questionSchema)