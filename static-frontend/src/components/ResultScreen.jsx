/*
  FILE: src/components/ResultScreen.jsx
  WHAT THIS FILE CARRIES:
  - Result screen layout: logo, trophy, feedback text, score box and Restart button.
  - STATIC VERSION: score is hardcoded (7 out of 30). Restart button just goes
    back to the Question screen, it does NOT re-fetch questions.
*/
import React from 'react'
import QuizLogo from './ui/QuizLogo'
import Card from './ui/Card'
import Button from "./ui/Button"
import Trophy from "../assets/trophy.png"
import RestartIcon from "../assets/restart-icon.svg"

function Restart() {
  return <img src={RestartIcon} alt="Restart" />
}

const ResultScreen = ({ showQuestionScreen }) => {
  // static values
  const totalQuestions = 30;
  const correctAnswers = 7;

  return (
    <section className='result-section'>
      <QuizLogo size="large" />
      <Card className="result-card">
        <div className='result-icon-wrapper'>
          <img src={Trophy} alt="Trophy" />
        </div>

        <h1 className='result-text'>You Could Have Done Better</h1>

        <div className='result-details'>
          <span className='correct-answers'>{correctAnswers}</span>
          <p className='total-questions'>
            Questions
            <br />
            out of <span className='weight-700'>{totalQuestions}</span>
          </p>
        </div>

        <Button icon={<Restart />} iconPosition="right" size="large" onClick={showQuestionScreen}>
          Restart
        </Button>
      </Card>
    </section>
  )
}

export default ResultScreen
