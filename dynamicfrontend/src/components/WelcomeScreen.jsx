/*
  FILE: src/components/WelcomeScreen.jsx
  WHAT THIS FILE CARRIES:
  - First screen: logo, "Are You Ready?" card, rules and Start button.
  - DYNAMIC LOGIC: Start button -> fetchQuestionsApi() -> processQuestions()
    saves questions in context -> showQuestionScreen().
    While loading, the button shows "Starting the quiz".
*/
import React, { useCallback, useState } from 'react'
import QuizLogo from "./ui/QuizLogo"
import Card from "./ui/Card"
import Button from "./ui/Button"

import QuestionBubble from "../assets/question-bubble.png"
import GreenCheckMark from "../assets/check-circle-green.svg"

import fetchQuestionsApi from "../api/fetchQuestionsApi"
import useQuestionContext from "../hooks/useQuestionContext"
import handleError from "../utils/handleError"

const WelcomeScreen = ({ showQuestionScreen }) => {
  const { processQuestions } = useQuestionContext();
  const [loading, setLoading] = useState(false)

  // handle response from API
  const handleResponse = useCallback(
    function (responseData) {
      processQuestions(responseData.questions)
      showQuestionScreen();
    },
    [processQuestions, showQuestionScreen]
  )

  // start quiz
  const beginQuiz = useCallback(
    function () {
      fetchQuestionsApi(handleResponse, handleError, setLoading)
    },
    [handleResponse]
  )

  return (
    <section className='welcome-section'>
      <QuizLogo size="large" />
      <Card className="welcome-card">
        <div className='welcome-card-content-top'>
          <img src={QuestionBubble} width={172} alt="Question bubble" />
          <h2>Are You Ready?</h2>
          <h3>Let's see how many questions you can answer:</h3>
        </div>
        <ul className='welcome-card-list'>
          <li className='list-item'>
            <img src={GreenCheckMark} alt="" />
            There are 30 Questions
          </li>
          <li className='list-item'>
            <img src={GreenCheckMark} alt="" />
            You need to pick 1 ans
          </li>
        </ul>
        <Button
          size="large"
          onClick={beginQuiz}
          loading={loading}
          loadingText="Starting the quiz"
        >
          I’m Ready - Start the Quiz
        </Button>
      </Card>
    </section>
  )
}

export default WelcomeScreen
