import {useMemo, useState, useCallback} from "react"
import QuestionContext from "./QuestionContext"


const QuestionProvider = ({children}) => {

//create states for questions and Active Questions
const [questions, setQuestions] = useState([]);
const [activeQuestionId, setActiveQuestionId] = useState("")

// find active question using useMemo
const activeQuestion = useMemo(
    () => questions.find((question) => question._id === activeQuestionId),
    [activeQuestionId, questions]
)
// calculate active question number : want to show like this 2/5
const activeQuestionNUmber = useMemo(()=>
questions.findIndex((question) => question._id === activeQuestionId)+ 1,
[activeQuestionId,questions])

//total questions
const totalQuestions = useMemo(()=>questions.length, [questions.length])

//function to update status

const updateQuestionStatus = useCallback(
    (isAnswerCorrect) =>{
        setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
        question._id === activeQuestionId ? 
        {...question, hasAttempted:true, isAnswerCorrect}:  question)
        )
    },
    [activeQuestionId]
)


//function to move to the next question
const activateNextQuestion = useCallback(() =>{
    const currentIndex = questions.findIndex((question) =>question._id === activeQuestionId)
    if(currentIndex !==-1 && currentIndex +1 < questions.length){
        setActiveQuestionId(questions[currentIndex+1]._id)
    }
}, [activeQuestionId, questions])


//count correct answers

const correctAnswers = useMemo(()=>{
    const noOfCorrectAnswers = questions.filter((question) =>
    question.isAnswerCorrect).length;
    return noOfCorrectAnswers
}, [questions])


//Process questions after fetching from API
const processQuestions = useCallback(function(questionApiResponse){
    setQuestions(
        questionApiResponse.map((question) => ({
            ...question,
            hasAttempted:false,
            isAnswerCorrect:false
        }))
    );
    setActiveQuestionId(questionApiResponse[0]._id)
},[])

//ceate a context value object
const contextValue = useMemo(
    ()=>({
     processQuestions,
     activateNextQuestion,
     activeQuestion,
     activeQuestionNUmber,
     totalQuestions,
     correctAnswers,
     updateQuestionStatus
    }),[
    processQuestions,
     activateNextQuestion,
     activeQuestion,
     activeQuestionNUmber,
     totalQuestions,
     correctAnswers,
     updateQuestionStatus
    ]
)

  return (
    <QuestionContext.Provider value={contextValue}>
        {children}
      
    </QuestionContext.Provider>
  )
}

export default QuestionProvider
