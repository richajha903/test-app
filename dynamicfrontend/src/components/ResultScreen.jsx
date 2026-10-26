/*
  FILE: src/components/ResultScreen.jsx
  WHAT THIS FILE CARRIES:
  - Result screen: trophy, feedback text, score box, Restart button.
  - DYNAMIC LOGIC:
    1. Reads correctAnswers and totalQuestions from context.
    2. Percentage decides feedback: >=90 Excellent, >=70 Good, >=50 Okay, else Could Do Better.
    3. Restart -> fetchQuestionsApi() again -> processQuestions() -> Question screen (fresh quiz).
*/
import React, { useCallback, useState } from 'react'
import QuizLogo from './ui/QuizLogo'
import Card from './ui/Card'
import Button from "./ui/Button"
import Trophy from "../assets/trophy.png"
import RestartIcon from "../assets/restart-icon.svg"

import useQuestionContext from '../hooks/useQuestionContext'
import fetchQuestionsApi from '../api/fetchQuestionsApi'
import handleError from '../utils/handleError'

function Restart() {
  return <img src={RestartIcon} alt="Restart" />
}

const ResultScreen = ({ showQuestionScreen }) => {
  const [loading, setLoading] = useState(false);
  const { totalQuestions, correctAnswers, processQuestions } = useQuestionContext()

  const percentage = (correctAnswers / totalQuestions) * 100;
  let feedbackText;
  if (percentage >= 90) {
    feedbackText = "Excellent Job"
  } else if (percentage >= 70) {
    feedbackText = "Good Job!"
  } else if (percentage >= 50) {
    feedbackText = "You Did Okay"
  } else {
    feedbackText = "You Could Have Done Better"
  }

  const handleResponse = useCallback(
    function (responseData) {
      processQuestions(responseData.questions);
      showQuestionScreen()
    },
    )








  const restartQuiz = useCallback(
    function () {
      fetchQuestionsApi(handleResponse, handleError, setLoading)
    },
    [handleResponse]
  )

  return (
    <section className='result-section'>
      <QuizLogo size="large" />
      <Card className="result-card">
        <div className='result-icon-wrapper'>
          <img src={Trophy} alt="Trophy" />
        </div>

        <h1 className='result-text'>{feedbackText}</h1>

        <div className='result-details'>
          <span className='correct-answers'>{correctAnswers}</span>
          <p className='total-questions'>
            Questions
            <br />
            out of <span className='weight-700'>{totalQuestions}</span>
          </p>
        </div>

        <Button
          icon={<Restart />}
          iconPosition="right"
          size="large"
          onClick={restartQuiz}
          loading={loading}
          loadingText="Restarting...."
        >
          Restart
        </Button>
      </Card>
    </section>
  )
}

export default ResultScreen
