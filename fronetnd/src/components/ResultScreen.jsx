import React,{useCallback, useState} from 'react'
import QuizLogo from './ui/QuizLogo'
import Trophy from "../assets/trophy.png"
import Button from "./ui/Button"
import RestartIcon from "../assets/restart-icon.svg";
import Card from './ui/Card';

import useQuestionContext from '../hooks/useQuestionContext';
import fetchQuestionsApi from '../api/fetchQuestiosApi';
import handleError from '../utils/handleError';

function Restart(){
    return <img src={RestartIcon}/>
}

const ResultScreen = (props) => {
    const {showQuestionScreen} = props;
    const [loading, setLoading] = useState(false);
    const {totalQuestions,correctAnswers,processQuestions} = useQuestionContext()

    //static values
    // const totalQuestions = 10;
    // const correctAnswers = 7;
    const percentage = (correctAnswers/totalQuestions) *100;
    let feedbackText = "You did Okay";

    if(percentage >=90){
        feedbackText ="Excellent Job"
    } else if(percentage >=70){
        feedbackText ="Good Job!"
    } else if(percentage >= 50){
        feedbackText = "You Did Okay"
    } else {
        feedbackText = "You Could Have Do Better"
    }

    const handleResponse = useCallback(
        function (responseData){
            processQuestions(responseData.questions);
            //change screen
            showQuestionScreen()
        },
        [processQuestions,showQuestionScreen]
    )

    const beginQuiz = useCallback(
    function(){
      fetchQuestionsApi(handleResponse,handleError, setLoading)
    },
    [handleResponse]
  )

  return (
    <section className='result-section'>
        <QuizLogo size= "large" />
        <Card className="result-card">

            <div className='result-icon-wrapper'>
                <img src={Trophy}/>
            </div>
            
            <h1 className='result-text'>{feedbackText}</h1>

            <div className='result-details'>
                <span className='correct-answers'>
                   {correctAnswers}
                </span>
                <p className='total-questions'>
                        Questions
                        <br/>
                        out of <span className='weight-700'>{totalQuestions}</span>
                </p>
            </div>
              
              <Button icon={<Restart/>} iconPosition="right" size="large"
              onClick={beginQuiz}
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
