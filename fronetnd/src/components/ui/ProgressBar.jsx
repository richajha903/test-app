import React, {useMemo} from 'react'
import clsx from "clsx"
import useQuestionContext from '../../hooks/useQuestionContext'

//this comp will show quiz progress visually
const ProgressBar = () => {

  const {activeQuestionNUmber,totalQuestions} = useQuestionContext();

    //current q.no.
    // const activeQuestionNumber = 2;
    // const totalQuestions = 5
    const progressText = useMemo(
      ()=> `${((activeQuestionNUmber/totalQuestions) *100).toFixed(2)}%`,
      [activeQuestionNUmber,totalQuestions]
    )
    //if (2/5)*100 = 40.00%

    const isFinalQuestion = useMemo(
      ()=> activeQuestionNUmber === totalQuestions, 
      [activeQuestionNUmber,totalQuestions]
    )
    // 2!== 5 => false
    // 5===5 => true

  return (
    // Built-in html progress bar
    <progress 
    value={activeQuestionNUmber}
    max={totalQuestions}
    className={clsx("progress-bar", isFinalQuestion && "final-question")}
    >
        {progressText}
      
    </progress>
  )
}
export default ProgressBar
