const QuestionModel = require("../models/question-model");

const MAX_QUESTION_COUNT = 30;

// Get all questions
const getQuestions = async (req, res) => {
    try {
        const questions = await QuestionModel.aggregate([
            { $sample: { size: MAX_QUESTION_COUNT } },
            { $project: { question: 1, options: 1 } }
        ]);

        res.status(200).json({ questions });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Validate answer
const validateAnswer = async (req, res) => {
    try {
        // 1. Extract data
        const { id, answer } = req.body;

        // 2. Check if request is valid
        if (!id || !answer || !answer.id || !answer.value) {
            return res.status(400).json({
                message: "Invalid req"
            });
        }

        // 3. Check if question exists
        const questionObj = await QuestionModel.findById(id);

        if (!questionObj) {
            return res.status(400).json({
                message: "Question does not exist"
            });
        }

        // 4. Validate the answer
        if (
            questionObj.answer.id === answer.id &&
            questionObj.answer.value === answer.value
        ) {
            return res.status(200).json({
                status: 1,
                message: "Correct ans"
            });
        }

        // 5. Wrong answer
        return res.status(200).json({
            status: 0,
            message: "Wrong ans"
        });

    } catch (err) {
        // 6. Handle error
        console.error("Error validating answer:", err);

        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};


module.exports = {
    getQuestions,
    validateAnswer
};