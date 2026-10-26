/*
  FILE: src/components/QuestionScreen.jsx
  WHAT THIS FILE CARRIES:
  - Question screen: logo, progress bar, question card, options, Next/Submit button.
  - DYNAMIC LOGIC:
    1. Reads activeQuestion, its number and totalQuestions from context.
    2. On option click -> remember selected option -> validateAnswerApi()
       -> updateQuestionStatus(status === 1) in context.
    3. Selected option turns green (correct) or red (wrong); other options get disabled.
    4. Next/Submit button is disabled until the question is attempted.
       Not last question -> "Next" (activateNextQuestion). Last question -> "Submit" (Result screen).
*/
import React, { useCallback, useEffect, useState } from 'react'
import clsx from "clsx"
import Card from "./ui/Card"
import Button from "./ui/Button"
import ProgressBar from "./ui/ProgressBar"
import QuizLogo from "./ui/QuizLogo"
import CorrectCheckmark from "../assets/white-checkmark.svg"
import IncorrectCheckmark from "../assets/incorrect-cross.svg"
import NextArrow from "../assets/chevron-left-rounded.svg"

import useQuestionContext from '../hooks/useQuestionContext'
import validateAnswerApi from "../api/validateAnswerApi"
import handleError from '../utils/handleError'

function NextArrowIcon() {
  return <img src={NextArrow} alt='Next Question' />
}

const QuestionScreen = ({ showResultScreen }) => {
  const [loading, setLoading] = useState(false);
  const {
    activateNextQuestion,
    activeQuestion,
    activeQuestionNumber,
    totalQuestions,
    updateQuestionStatus
  } = useQuestionContext()

  // track selected option
  const [userSelectedOption, setUserSelectedOption] = useState("")
  const hasAttempted = Boolean(userSelectedOption)

  // reset selected option when question changes
  useEffect(() => {
    setUserSelectedOption("");
  }, [activeQuestion._id])

  const isFinalQuestion = activeQuestionNumber === totalQuestions

  const handleResponse = useCallback(
    function (responseData) {
      const isAnswerCorrect = responseData.status === 1;
      updateQuestionStatus(isAnswerCorrect)
    },
    [updateQuestionStatus]
  )

  // when user clicks an option
  const handleClick = useCallback((selectedOption) => {
    setUserSelectedOption(selectedOption.id)
    validateAnswerApi(activeQuestion._id, selectedOption, handleResponse, handleError, setLoading)
  }, [activeQuestion._id, handleResponse])

  return (
    <section className='question-section'>
      <QuizLogo />
      <ProgressBar />
      <div className='question-content'>
        <Card className="question-card">
          <div className='question-number'>
            {activeQuestionNumber}/{totalQuestions}
          </div>

          <p className='question-text'>{activeQuestion.question}</p>

          <div className='question-options'>
            {activeQuestion.options.map((option) => {
              const isThisSelected = option.id === userSelectedOption
              const isOptionCorrect = isThisSelected && activeQuestion.isAnswerCorrect;
              const isOptionIncorrect = isThisSelected && !loading && !activeQuestion.isAnswerCorrect
              const isLoading = isThisSelected && loading
              return (
                <button
                  className={clsx(
                    "option",
                    !hasAttempted && "not-answered",
                    isLoading && "loading",
                    isOptionCorrect && "correct-answer",
                    isOptionIncorrect && "incorrect-answer"
                  )}
                  key={activeQuestion._id + "-" + option.id}
                  onClick={() => handleClick(option)}
                  disabled={hasAttempted}
                >
                  {option.value}
                  {isThisSelected ? (
                    <span className={clsx(isOptionCorrect && "correct-radio", isOptionIncorrect && "incorrect-radio")}>
                      {isOptionCorrect && <img src={CorrectCheckmark} alt='correct ans' />}
                      {isOptionIncorrect && <img src={IncorrectCheckmark} alt='wrong ans' />}
                    </span>
                  ) : (
                    <span className='unattempted-radio' />
                  )}
                </button>
              )
            })}
          </div>

          {/* last question => "Submit", otherwise => "Next" */}
          {isFinalQuestion ? (
            <Button disabled={!activeQuestion.hasAttempted} onClick={showResultScreen}>
              Submit
            </Button>
          ) : (
            <Button
              icon={<NextArrowIcon />}
              iconPosition="right"
              onClick={activateNextQuestion}
              disabled={!activeQuestion.hasAttempted}
            >
              Next
            </Button>
          )}
        </Card>
      </div>
    </section>
  )
}

export default QuestionScreen
