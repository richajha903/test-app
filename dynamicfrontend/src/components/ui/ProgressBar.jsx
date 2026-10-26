/*
  FILE: src/components/ui/ProgressBar.jsx
  WHAT THIS FILE CARRIES:
  - Shows quiz progress using the built-in HTML <progress> element.
  - DYNAMIC LOGIC: reads activeQuestionNumber and totalQuestions from context,
    so the bar grows as you move to the next question.
    On the last question it adds "final-question" class (bar fully filled, no rounded edge).
*/
import React, { useMemo } from 'react'
import clsx from "clsx"
import useQuestionContext from '../../hooks/useQuestionContext'

const ProgressBar = () => {
  const { activeQuestionNumber, totalQuestions } = useQuestionContext();

  // e.g. (2/5)*100 = "40.00%"
  const progressText = useMemo(
    () => `${((activeQuestionNumber / totalQuestions) * 100).toFixed(2)}%`,
    [activeQuestionNumber, totalQuestions]
  )

  const isFinalQuestion = activeQuestionNumber === totalQuestions

  return (
    <progress
      value={activeQuestionNumber}
      max={totalQuestions}
      className={clsx("progress-bar", isFinalQuestion && "final-question")}
    >
      {progressText}
    </progress>
  )
}

export default ProgressBar
