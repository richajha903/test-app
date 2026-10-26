/*
  FILE: src/components/ui/ProgressBar.jsx
  WHAT THIS FILE CARRIES:
  - Shows quiz progress using the built-in HTML <progress> element.
  - STATIC VERSION: uses hardcoded values (question 1 of 30).
    In the dynamic version these values come from QuestionContext.
*/
import React from 'react'
import clsx from "clsx"

const ProgressBar = () => {
  // static values
  const activeQuestionNumber = 1;
  const totalQuestions = 30;
  const isFinalQuestion = activeQuestionNumber === totalQuestions;

  return (
    <progress
      value={activeQuestionNumber}
      max={totalQuestions}
      className={clsx("progress-bar", isFinalQuestion && "final-question")}
    >
      {((activeQuestionNumber / totalQuestions) * 100).toFixed(2)}%
    </progress>
  )
}

export default ProgressBar
