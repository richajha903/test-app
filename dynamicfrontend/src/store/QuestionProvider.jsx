/*
  FILE: src/store/QuestionProvider.jsx
  WHAT THIS FILE CARRIES:
  - The BRAIN of the quiz. Holds all quiz state and shares it via QuestionContext.
  - State:   questions (list from backend), activeQuestionId (question on screen)
  - Derived: activeQuestion, activeQuestionNumber (e.g. 2 in "2/30"),
             totalQuestions, correctAnswers
  - Actions: processQuestions(list)        -> save questions, select the first one
             updateQuestionStatus(correct) -> mark active question attempted + correct/wrong
             activateNextQuestion()        -> move to the next question
*/
import { useMemo, useState, useCallback } from "react"
import QuestionContext from "./QuestionContext"

const QuestionProvider = ({ children }) => {

  // states for questions and active question
  const [questions, setQuestions] = useState([]);
  const [activeQuestionId, setActiveQuestionId] = useState("")

  // find active question
  const activeQuestion = useMemo(
    () => questions.find((question) => question._id === activeQuestionId),
    [activeQuestionId, questions]
  )

  // active question number, to show like 2/30
  const activeQuestionNumber = useMemo(
    () => questions.findIndex((question) => question._id === activeQuestionId) + 1,
    [activeQuestionId, questions]
  )

  const totalQuestions = questions.length

  // mark active question as attempted and save if answer was correct
  const updateQuestionStatus = useCallback(
    (isAnswerCorrect) => {
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question._id === activeQuestionId
            ? { ...question, hasAttempted: true, isAnswerCorrect }
            : question
        )
      )
    },
    [activeQuestionId]
  )

  // move to the next question
  const activateNextQuestion = useCallback(() => {
    const currentIndex = questions.findIndex((question) => question._id === activeQuestionId)
    if (currentIndex !== -1 && currentIndex + 1 < questions.length) {
      setActiveQuestionId(questions[currentIndex + 1]._id)
    }
  }, [activeQuestionId, questions])

  // count correct answers
  const correctAnswers = useMemo(
    () => questions.filter((question) => question.isAnswerCorrect).length,
    [questions]
  )

  // process questions after fetching from API
  const processQuestions = useCallback((questionApiResponse) => {
    setQuestions(
      questionApiResponse.map((question) => ({
        ...question,
        hasAttempted: false,
        isAnswerCorrect: false
      }))
    );
    setActiveQuestionId(questionApiResponse[0]._id)
  }, [])

  const contextValue = useMemo(
    () => ({
      processQuestions,
      activateNextQuestion,
      activeQuestion,
      activeQuestionNumber,
      totalQuestions,
      correctAnswers,
      updateQuestionStatus
    }),
    [
      processQuestions,
      activateNextQuestion,
      activeQuestion,
      activeQuestionNumber,
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
