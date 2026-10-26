import React, { useCallback, useEffect, useState,useMemo } from 'react'
import Card from "./ui/Card"
import Button from "./ui/Button"
import ProgessBar from "./ui/ProgressBar"
import QuizLogo from "./ui/QuizLogo"
import CorrectCheckmark from "../assets/white-checkmark.svg"
import IncorrectCheckmark from "../assets/incorrect-cross.svg"
import NextArrow from "../assets/chevron-left-rounded.svg"
import clsx from "clsx"

import useQuestionContext from '../hooks/useQuestionContext'
import validateAnswerApi from "../api/ValidateAnswerApi"
import handleError from '../utils/handleError'


function NextArrowIcon(){
    return <img src={NextArrow} alt='Next Question'/>
}


const QuestionScreen = (props) => {

   const {showResultScreen} = props;
   const[loading,setLoading] = useState(false);
   const{
     activateNextQuestion,
     activeQuestion,
     activeQuestionNUmber,
     totalQuestions,
     updateQuestionStatus
   } = useQuestionContext()

   //track selected option
   const [userSelectedOption, setUserSelectedOption] = useState("")

   //user has selected an option
   const hasAttempted = Boolean(userSelectedOption)

   //reset selected option when question changes
   useEffect(()=>{
    setUserSelectedOption("");
   },[activeQuestion._id])

   //is this last question
   const isFinalQuestion = useMemo(
    ()=> activeQuestionNUmber === totalQuestions,
    [activeQuestionNUmber,totalQuestions]
    )


    const handleResponse = useCallback(
    function(responseData){
        const isAnswerCorrect = responseData.status ===1;
        updateQuestionStatus(isAnswerCorrect)

    },
    [updateQuestionStatus]
    )

    //when user click optiom
    const handleClick = useCallback((seletedOption) =>{
        setUserSelectedOption(seletedOption.id)
        validateAnswerApi(activeQuestion._id, seletedOption,handleResponse, handleError,setLoading)
    }, [activeQuestion._id, handleResponse])




  return (
    <section className='question-section'>
        <QuizLogo/>
        <ProgessBar/>
        <div className='question-content'>
            <Card className="question-card">
                <div className='question-number'>
                    {activeQuestionNUmber}/{totalQuestions}
                </div>
                
                <p className='question-text'>
                    {activeQuestion.question}
                </p>

                <div className='question-options'>
                   {activeQuestion.options.map((option) =>{
                    const isThisSelected= option.id === userSelectedOption
                    const isOptionCorrect = isThisSelected && activeQuestion.isAnswerCorrect;
                    const isOptionIncorrect = isThisSelected && !loading && !activeQuestion.isAnswerCorrect
                    const isLoading = isThisSelected && loading
                    return(
                        <button className={clsx(
                            "option", 
                            !hasAttempted && "not-answered",
                            isLoading && "loading",
                            isOptionCorrect && "correct-answer",
                            isOptionIncorrect && "incorrect-answer"
                        )}
                         key={activeQuestion._id + "-" + option.id}
                         onClick={()=> handleClick(option)}
                         disabled={hasAttempted}
                        >
                            {option.value} 
                            {isThisSelected ?(
                                <span className={clsx(isOptionCorrect && "correct-radio",
                                    isOptionIncorrect && "incorrect-radio"
                                )}
                                >
                                 {isOptionCorrect && (<img src={CorrectCheckmark} alt='correct ans'/>)}
                                 {isOptionIncorrect && (<img src={IncorrectCheckmark} alt='wrong ans'/>)}

                                </span>

                            ):(
                                <span className='unattempted-radio'/>
                            )
                            
                            }
                        </button>
                    )
                   })}
                </div>

                {/* button text=> next (current question is not last question)
                 button text=> Submit (current question is  last question) */}
                {isFinalQuestion ?
                (
                <Button 
                    disabled={!activeQuestion.hasAttempted}
                    onClick={showResultScreen}
                
                >Submit</Button>):(
                    <Button 
                    icon={<NextArrowIcon/>} 
                    iconPosition="right" 
                    onClick={activateNextQuestion}
                    disabled={!activeQuestion.hasAttempted}>
                        Next
                    </Button>
                )
                
            }
            </Card>

        </div>
      
    </section>
  )
}

export default QuestionScreen
